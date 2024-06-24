import { fields, collection } from "@keystatic/core";

export const identityGroup = collection({
  label: "Trans Identity Groups",
  slugField: "name",
  path: "src/content/identity-groups/*",
  entryLayout: "form",
  schema: {
    name: fields.slug({
      name: {
        label: "Name",
        description: "The name of the identity group",
        validation: {
          isRequired: true,
        },
      },
    }),
  },
})