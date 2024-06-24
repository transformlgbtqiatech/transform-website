import { fields, collection } from "@keystatic/core";

export const violenceCategory = collection({
  label: "Violence Categories",
  slugField: "name",
  path: "src/content/violence-categories/*",
  schema: {
    name: fields.slug({
      name: {
        label: "Name",
        description: "The name of the violence category",
        validation: {
          isRequired: true,
        },
      },
    }),
  },
})