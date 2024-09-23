import { fields, singleton } from "@keystatic/core";
import { simpleEditorOptions } from "@root/src/utils/common/simple-editor-options";

export const contactSubmit = singleton({
  label: "Contact Submit Page",
  path: 'src/singletons-data/contact-submit',
  format: 'json',
  schema: {
    whyThisInfo: fields.mdx({
      label: 'Why do we ask for this information',
      options: simpleEditorOptions,
    }),
    buyUsAKoFi: fields.mdx({
      label: 'Buy us a Ko-fi',
      options: simpleEditorOptions,
    })
  }
})