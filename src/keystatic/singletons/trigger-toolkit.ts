import { fields, singleton } from "@keystatic/core";
import { simpleEditorOptions } from "@root/src/utils/common/simple-editor-options";

export const triggerToolkit = singleton({
  label: "Trigger Toolkit",
  path: 'src/singletons-data/trigger-toolkit',
  format: 'json',
  schema: {
    mainDescription: fields.mdx({
      label: 'Main Description',
      options: simpleEditorOptions,
    }),
  }
})