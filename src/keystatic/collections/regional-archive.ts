import { fields, collection } from "@keystatic/core";
import { simpleEditorOptions } from "@root/src/utils/common/simple-editor-options";

export const regionalArchive = collection({
  label: "Regional Archives",
  slugField: "title",
  columns: ['language', 'medium'],
  path: "src/content/regional-archive/*/",
  entryLayout: "content",
  format: {
    contentField: "additionalDetails",
  },
  schema: {
    language: fields.relationship({
      label: 'Language Name',
      collection: 'regionalArchivesLanguage',
      validation: {
        isRequired: true
      }
    }),
    title: fields.slug({
      name: {
        label: 'Title',
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
    year: fields.number({
      label: 'Year',
    }),
    authorOrCreator: fields.text({
      label: 'Author or Creator',
    }),
    medium: fields.relationship({
      collection: 'regionalArchiveMedium',
      label: 'Medium',
      validation: {
        isRequired: true,
      }
    }),
    additionalDetails: fields.mdx({
      label: 'Additional Details',
      options: simpleEditorOptions
    })
  }
})