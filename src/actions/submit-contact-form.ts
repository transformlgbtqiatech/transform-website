import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { transformSheet } from "@utils/server/sheet";

export const submitContactForm = defineAction({
  accept: 'form',
  input: z.object({
    contactSubmitType: z.enum(['contribute', 'write-to-us']),
    name: z.string().optional(),
    email: z.string().email().optional(),
    identityGroup: z.string().optional(),
    violenceSubCategory: z.string().optional(),
    message: z.string().min(5),
  }),
  handler: async (input) => {
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