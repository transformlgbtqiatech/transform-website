import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { transformSheet } from "@utils/server/sheet";
import { getSecret } from "astro:env/server";

const CLOUDFLARE_TURNSTILE_SECRET_KEY = getSecret(
  "CLOUDFLARE_TURNSTILE_SECRET_KEY",
)!;

export const submitContactForm = defineAction({
  accept: 'form',
  input: z.object({
    contactSubmitType: z.enum(['contribute', 'write-to-us']),
    name: z.string().optional(),
    email: z.string().email('Not a valid email').optional(),
    identityGroup: z.string().optional(),
    violenceSubCategory: z.string().optional(),
    message: z.string({
      errorMap(issue, ctx) {
        if (issue.code === 'too_small') {
          return {
            message: 'Message is too short.'
          }
        }

        return { message: ctx.defaultError }
      }
    }).min(5),
    "cf-turnstile-response": z.string()
  }),
  handler: async (input, context) => {
    const token = input["cf-turnstile-response"];
    const ip = context.request.headers.get("CF-Connecting-IP")!;

    const formData = new FormData();

    formData.append("secret", CLOUDFLARE_TURNSTILE_SECRET_KEY);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    const result = await fetch(url, {
      body: formData,
      method: "POST",
    });

    const outcome = await result.json();

    if (!outcome.success) {
      throw new ActionError({
        code: 'FORBIDDEN',
        message: 'Failed to verify browser challenge'
      })
    }

    await transformSheet.loadInfo();
    const writeToUsSheet = transformSheet.sheetsById[0];
    const contributeSheet = transformSheet.sheetsById[11415622];

    try {
      if (input.contactSubmitType === 'contribute') {
        contributeSheet.addRow({
          name: input.name ?? 'Anonymous',
          email: input.email ?? 'Anonymous',
          subject: input.contactSubmitType,
          'identity-group': input.identityGroup ?? '-', // this should never be reached
          'violence-sub-category': input.violenceSubCategory ?? '-', // this should never be reached,
          message: input.message,
          approved: 'no'
        })
        // check if identityGroup and violenceSubCategory are present.
      } else {
        writeToUsSheet.addRow({
          name: input.name ?? 'Anonymous',
          email: input.email ?? 'Anonymous',
          subject: input.contactSubmitType,
          message: input.message
        })
      }

      return {
        success: true,
        input
      }
    } catch (e) {
      // TODO handle error
      return {
        success: false,
      }
    }
  }
})