import { fields, collection } from "@keystatic/core";

const simpleEditorOptions = {
  link: true,
  bold: true,
  italic: true,
  blockquote: false,
  image: false,
  table: false,
  code: false,
  strikethrough: false,
  codeBlock: false,
  divider: false,
  heading: false,
  orderedList: false,
  unorderedList: false
}

export const regionalArchive = collection({
  label: "Regional Archives",
  slugField: "title",
  columns: ['language', 'type'],
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
    type: fields.text({
      label: 'Type',
    }),
    additionalDetails: fields.mdx({
      label: 'Additional Details',
      options: simpleEditorOptions
    })
  }
})