import { fields, singleton } from "@keystatic/core";
import { simpleEditorOptions } from "@root/src/utils/common/simple-editor-options";

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