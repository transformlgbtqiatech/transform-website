import { fields, collection } from "@keystatic/core";
import { simpleEditorOptions } from "@root/src/utils/common/simple-editor-options";

export const affirmativeAction = collection({
  label: "Affirmative Action",
  slugField: "name",
  path: "src/content/affirmative-action/*/",
  entryLayout: "content",
  columns: ['type'],
  format: {
    contentField: "overview",
  },
  schema: {
    type: fields.relationship({
      label: "Type",
      collection: "affirmativeActionType",
      validation: {
        isRequired: true,
      },
    }),
    name: fields.slug({
      name: {
        label: 'Name',
        validation: {
          isRequired: true,
        }
      }
    }),
    url: fields.url({
      label: 'Link',
      validation: {
        isRequired: true,
      }
    }),
    overview: fields.mdx({
      label: 'Title',
      options: simpleEditorOptions,
    })
  }
})