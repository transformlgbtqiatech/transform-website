import { fields, collection } from "@keystatic/core";
import { inline } from "@keystatic/core/content-components";
import { FootnotePreview } from "../components/FootnotePreview";
import { GlossaryPreview } from "../components/GlossaryPreview";
import { footprintsIcon } from "@keystar/ui/icon/icons/footprintsIcon";
import { bookAIcon } from "@keystar/ui/icon/icons/bookAIcon";
import { Icon } from "@keystar/ui/icon";

export const knowledgeCollection = collection({
  label: "Knowledge",
  slugField: "title",
  path: "src/content/knowledge-posts/*",
  entryLayout: "content",
  format: {
    contentField: "content",
  },
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
      collection: "triggerWarningContentPosts",
    }),
    content: fields.mdx({
      label: "Content",
      components: {
        Footnote: inline({
          label: "Footnote",
          icon: <Icon src={footprintsIcon} />,
          schema: {
            inlineText: fields.text({
              label: "Inline Text",
              validation: {
                isRequired: true,
              },
            }),
            footNoteText: fields.text({
              label: "Footnote Text",
              multiline: true,
              validation: {
                isRequired: true,
              },
            }),
            //
            // footNoteText: fields.mdx({
            //   label: "Footnote Text",
            // }),
          },
          NodeView: (props) => {
            return <FootnotePreview {...props.value} />;
          },
        }),
        Glossary: inline({
          label: "Glossary",
          icon: <Icon src={bookAIcon} />,
          schema: {
            glossaryTerm: fields.relationship({
              label: "Glossary Term",
              collection: "glossary",
              validation: {
                isRequired: true,
              },
            }),
          },
          NodeView: (props) => {
            console.info(props);
            return <GlossaryPreview {...props.value} />;
          },
        }),
      },
    }),
    transIdentityGroup: fields.relationship({
      label: "Trans Identity Group",
      description: "The trans identity group this knowledge post belongs to",
      collection: "identityGroups",
      validation: {
        isRequired: true,
      },
    }),
    violenceSubCategory: fields.relationship({
      label: "Violence Sub Category",
      description: "The violence sub category this knowledge post belongs to",
      collection: "violenceSubCategories",
      validation: {
        isRequired: true,
      },
    }),
    recommendedReading: fields.mdx({
      label: "Recommended Reading",
    }),
  },
});
