import { fields, collection } from "@keystatic/core";

export const regionalArchivesLanguage = collection({
  label: "Regional Archives Languages",
  slugField: "language",
  path: "src/content/regional-archives-languages/*",
  entryLayout: "form",
  schema: {
    language: fields.slug({
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