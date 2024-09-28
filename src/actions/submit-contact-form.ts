/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionError, defineAction, type ActionAPIContext } from "astro:actions";
import { z } from "astro:schema";
import { transformSheet } from "@utils/server/sheet";
import { getSecret } from "astro:env/server";
import {
  SUBMIT_TYPE__CONTRIBUTE_LIVED_EXPERIENCES,
  SUBMIT_TYPE__CONTRIBUTE_TO_DIFFERENT_PAGE,
  SUBMIT_TYPE__WRITE_TO_US
} from "../pages/contact-submit/_internal/select-options";
import { getCollection } from "astro:content";
import type { GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { CONTRIBUTE_DIFFERENT_PAGE_ID, LIVED_EXPERIENCE_ID, WRITE_TO_US_SHEET_ID } from "../utils/common/googlesheet";

const commonSchema = z.object({
  "cf-turnstile-response": z.string()
})

const MAX_NAME_LENGTH = 160;
const MAX_EMAIL_LENGTH = 256;
const MAX_LONG_FORM_CONTENT = 6000;

// SCHEMA 1
const writeToUsSchema = z.object({
  contactSubmitType: z.literal(SUBMIT_TYPE__WRITE_TO_US),
  name: z.string({
    message: 'Name is required.'
  }).max(MAX_NAME_LENGTH, {
    message: 'Name is too long.'
  }),
  email: z.string({
    message: 'Email is required',
  })
    .email()
    .max(MAX_EMAIL_LENGTH, {
      message: 'Email address is too long.'
    }),
  livedExperience: z.string({
    message: "Message can't be empty",
  })
}).merge(commonSchema)

// SCHEMA 2

const identityGroups = await getCollection("identity-groups");
const violenceSubCategories = await getCollection("violence-sub-categories");

const identitySelectIds = identityGroups.map((identityGroup) => {
  return identityGroup.id
});

const violenceSubCategorySelectIds = violenceSubCategories.map(
  (violenceSubCategory) => {
    return violenceSubCategory.id
  },
)

const contributeLivedExperiencesSchema = z.object({
  contactSubmitType: z.literal(SUBMIT_TYPE__CONTRIBUTE_LIVED_EXPERIENCES),
  nameOrPseudonym: z
    .string()
    .max(MAX_NAME_LENGTH, {
      message: 'Name is too long.'
    }).optional(),
  howDoYouIdentify: z.string({
    message: "This field is required"
  }).max(500, {
    message: "Can't have more than 500 characters"
  }),
  identityGroup: z.enum(identitySelectIds as [string, ...string[]]),
  violenceSubCategory: z.enum(violenceSubCategorySelectIds as [string, ...string[]]),
  livedExperience: z.string({
    message: "Please provide a lived experience"
  }).max(MAX_LONG_FORM_CONTENT, {
    message: `Can't have more than ${MAX_LONG_FORM_CONTENT} characters`
  }),
  age: z.number().optional(),
  location: z.string().optional(),
  otherPagesForLivedExperience: z.string().optional(),
  consentForLivedExperienceUse: z.boolean().optional(),
  email: z
    .string()
    .email({
      message: 'Please provide a valid email address'
    })
    .max(MAX_EMAIL_LENGTH, {
      message: 'Email address is too long.'
    })
    .optional(),
}).merge(commonSchema)

// SCHEMA 3
const MAX_RELEVANT_LINKS_LENGTH = 2000;

const contributeToDifferentPage = z.object({
  contactSubmitType: z.literal(SUBMIT_TYPE__CONTRIBUTE_TO_DIFFERENT_PAGE),
  name: z.string().optional(),
  email: z
    .string()
    .email({
      message: 'Please provide a valid email address'
    })
    .max(MAX_EMAIL_LENGTH, {
      message: 'Email address is too long.'
    })
    .optional(),
  whatPagesContributeTo: z
    .string({
      message: 'Please tell us the toolkit page you would like your lived experience to be visible in'
    })
    .max(500),
  addYourContribution: z
    .string({
      message: "This field is required",
    })
    .max(MAX_LONG_FORM_CONTENT, {
      message: `Can't have more than ${MAX_LONG_FORM_CONTENT} characters`
    }),
  relevantLinks: z
    .string()
    .max(MAX_RELEVANT_LINKS_LENGTH, {
      message: `Can't have more than ${2000} characters`
    })
    .optional()
}).merge(commonSchema)

const submitContactFormSchema = z.discriminatedUnion("contactSubmitType", [
  writeToUsSchema,
  contributeLivedExperiencesSchema,
  contributeToDifferentPage
])

async function readHeaderRow(sheet: GoogleSpreadsheetWorksheet) {
  try {
    await sheet.loadHeaderRow();
    return sheet.headerValues
  } catch (e) {
    return []
  }
}

type SetHeaderRowsOptions = {
  existingHeaderValues: string[]
  requiredHeaderValues: string[]
}

async function setHeaderRow(sheet: GoogleSpreadsheetWorksheet, options: SetHeaderRowsOptions) {
  const { existingHeaderValues, requiredHeaderValues } = options;

  if (existingHeaderValues.length > 0) {
    return
  }

  try {
    await sheet.setHeaderRow(requiredHeaderValues, 0)
  } catch (e) {
    // TODO handle this
  }
}

type AddSheetRowOptions<T extends Record<string, any>> = {
  row: T
}

function addSheetRow<
  T extends Record<string, any>
>(
  sheet: GoogleSpreadsheetWorksheet,
  options: AddSheetRowOptions<T>
) {
  const { row } = options
  sheet.addRow(row)
}

type SetHeaderRowIfNeededOptions<Input extends Record<string, any>> = {
  formInput: Input,
  addApprovedHeader?: boolean
}

async function setHeaderRowIfNeeded<Input extends Record<string, any>>(sheet: GoogleSpreadsheetWorksheet, options: SetHeaderRowIfNeededOptions<Input>) {
  const { formInput } = options;
  const existingHeaderValues = await readHeaderRow(sheet);
  const requiredHeaderValues = getRequriedHeaderValues(formInput)
  await setHeaderRow(sheet, { existingHeaderValues, requiredHeaderValues });
}

function getRequriedHeaderValues<T extends Record<string, any>>(input: T) {
  const keys = Object.keys(input)
  return keys.filter(el => el !== 'cf-turnstile-response' && el !== 'contactSubmitType')
}

export const submitContactForm = defineAction({
  accept: 'form',
  input: submitContactFormSchema,
  handler: async (input, context) => {
    await cfProtection({
      input, context
    })

    await transformSheet.loadInfo();
    const writeToUsSheet = transformSheet.sheetsById[WRITE_TO_US_SHEET_ID];
    const livedExperiencesSheet = transformSheet.sheetsById[LIVED_EXPERIENCE_ID];
    const contributeDifferentPageSheet = transformSheet.sheetsById[CONTRIBUTE_DIFFERENT_PAGE_ID];

    if (input.contactSubmitType === SUBMIT_TYPE__WRITE_TO_US) {
      await setHeaderRowIfNeeded(writeToUsSheet, { formInput: input });
      addSheetRow(writeToUsSheet, {
        row: input
      })
    }

    if (input.contactSubmitType === SUBMIT_TYPE__CONTRIBUTE_LIVED_EXPERIENCES) {
      const googleSheetInput = {
        ...input,
        livedExperienceEdited: input.livedExperience,
        approved: false
      }

      await setHeaderRowIfNeeded(
        livedExperiencesSheet, {
        formInput: googleSheetInput,
        addApprovedHeader: true
      });

      addSheetRow(livedExperiencesSheet, {
        row: googleSheetInput,
      })
    }

    if (input.contactSubmitType === SUBMIT_TYPE__CONTRIBUTE_TO_DIFFERENT_PAGE) {
      await setHeaderRowIfNeeded(contributeDifferentPageSheet, { formInput: input });
      addSheetRow(contributeDifferentPageSheet, {
        row: input,
      })
    }

    return {
      input
    }
  }
})

// const CLOUDFLARE_TURNSTILE_SECRET_KEY = getSecret(
//   "CLOUDFLARE_TURNSTILE_SECRET_KEY",
// )!;

const CLOUDFLARE_DEV_TURNSTILE_SECRET_KEY_ALWAYS_PASSES = getSecret(
  "CLOUDFLARE_DEV_TURNSTILE_SECRET_KEY_ALWAYS_PASSES"
)!

// const CLOUDFLARE_DEV_TURNSTILE_SECRET_KEY_ALWAYS_FAILS = getSecret(
//   "CLOUDFLARE_DEV_TURNSTILE_SECRET_KEY_ALWAYS_FAILS",
// )!

// const CLOUDFLARE_DEV_TURNSTILE_SECRET_KEY_TOKEN_ALREADY_SPENT = getSecret(
//   "CLOUDFLARE_DEV_TURNSTILE_SECRET_KEY_TOKEN_ALREADY_SPENT",
// )!

type CFProtectionFnOptions = {
  input: z.infer<typeof submitContactFormSchema>
  context: ActionAPIContext
}

async function cfProtection(options: CFProtectionFnOptions) {
  const { input, context } = options;
  const token = input["cf-turnstile-response"];
  const ip = context.request.headers.get("CF-Connecting-IP")!;

  const formData = new FormData();

  formData.append("secret", CLOUDFLARE_DEV_TURNSTILE_SECRET_KEY_ALWAYS_PASSES);
  formData.append("response", token);
  formData.append("remoteip", ip);

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  const result = await fetch(url, {
    body: formData,
    method: "POST",
  });

  const outcome = await result.json();

  if (!outcome.success) {
    const errorCodes = outcome["error-codes"]

    if (errorCodes.includes("invalid-input-response")) {
      throw new ActionError({
        code: 'FORBIDDEN',
        message: 'Failed to verify browser challenge'
      })
    }

    if (errorCodes.includes("timeout-or-duplicate")) {
      throw new ActionError({
        code: 'CONFLICT',
        message: 'Timed out or duplicate request'
      })
    }

    throw new ActionError({
      code: 'BAD_REQUEST'
    })
  }
}