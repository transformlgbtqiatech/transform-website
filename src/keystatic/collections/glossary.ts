import { fields, collection } from "@keystatic/core";
import { simpleEditorOptions } from "@root/src/utils/common/simple-editor-options";

export const glossary = collection({
  label: "Glossary",
  slugField: "name",
  path: "src/content/glossary/*/",
  entryLayout: "content",
  format: {
    contentField: "definition",
  },
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
    definition: fields.mdx({
      label: "Rich Definition",
      options: simpleEditorOptions
    })
  },
})