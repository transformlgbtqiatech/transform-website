import { fields, collection } from "@keystatic/core";

export const glossaryCollection = collection({
  label: "Glossary",
  slugField: "name",
  path: "src/content/glossary/*",
  schema: {
    name: fields.slug({
      name: {
        label: "Name",
        description: "The name of glossary term",
        validation: {
          isRequired: true,
        },
      },
    }),
    definition: fields.text({
      label: "Definition",
      multiline: true,
      validation: {
        isRequired: true,
      },
    }),
  },
})