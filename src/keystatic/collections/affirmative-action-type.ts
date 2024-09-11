import { fields, collection } from "@keystatic/core";

export const affirmativeActionType = collection({
  label: "Affirmative Action Types",
  slugField: "name",
  path: "src/content/affirmative-action-type/*",
  format: 'json',
  schema: {
    name: fields.slug({
      name: {
        label: "Name",
        description: "The name of the affirmative action type",
        validation: {
          isRequired: true,
        },
      },
    }),
  },
})