import { fields, singleton } from "@keystatic/core";

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

export const regionalArchives = singleton({
  label: "Regional Archives Meta Info",
  path: 'src/singletons-data/regional-archives',
  format: 'json',
  schema: {
    title: fields.mdx({
      label: 'Title',
      options: simpleEditorOptions,
    }),
  }
})