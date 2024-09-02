import {
  KeyStaticFootnoteComponent,
  KeyStaticGlossaryComponent,
} from "@cms/keystatic-config-components/keystatic-config-components";
import { fields, collection } from "@keystatic/core";

export const knowledge = collection({
  label: "Knowledge",
  slugField: "title",
  path: "src/content/knowledge-posts/*/",
  entryLayout: "content",
  format: {
    contentField: "content",
  },
  columns: ["transIdentityGroup", "violenceSubCategory"],
  schema: {
    title: fields.slug({
      name: {
        label: "Title",
        description:
          "Although this title is not used anywhere in the UI, it helps to create a unique id for this knowledge post. This title, if required, could be used as a title of this knowledge post in the future, if need be.",
        validation: {
          isRequired: true,
        },
      },
    }),
    triggerWarning: fields.relationship({
      label: "Trigger Warning",
      collection: "triggerWarning",
    }),
    content: fields.mdx({
      label: "Content",
      components: {
        Footnote: KeyStaticFootnoteComponent,
        Glossary: KeyStaticGlossaryComponent,
      },
    }),
    transIdentityGroup: fields.relationship({
      label: "Trans Identity Group",
      description: "The trans identity group this knowledge post belongs to",
      collection: "identityGroup",
      validation: {
        isRequired: true,
      },
    }),
    violenceSubCategory: fields.relationship({
      label: "Violence Sub Category",
      description: "The violence sub category this knowledge post belongs to",
      collection: "violenceSubCategory",
      validation: {
        isRequired: true,
      },
    }),
    recommendedReading: fields.mdx({
      label: "Recommended Reading",
      components: {
        Footnote: KeyStaticFootnoteComponent,
        Glossary: KeyStaticGlossaryComponent,
      },
    }),
  },
});
