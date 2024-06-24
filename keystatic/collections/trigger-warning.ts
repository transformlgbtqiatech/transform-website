import { fields, collection } from "@keystatic/core";

export const triggerWarningCollection = collection({
  label: "Trigger Warning Content Posts",
  slugField: "title",
  path: "src/content/trigger-warning-content-posts/*",
  entryLayout: "content",
  format: {
    contentField: "content",
  },
  schema: {
    title: fields.slug({
      name: {
        label: "Title",
        description:
          "Although this title is not used anywhere in the UI, it helps to create a unique id for this knowledge post. This title, if required, could be used as a title of this trigger warning post in the future, if need be.",
        validation: {
          isRequired: true,
        },
      },
    }),
    content: fields.mdx({
      label: "Content",
    }),
  },
})