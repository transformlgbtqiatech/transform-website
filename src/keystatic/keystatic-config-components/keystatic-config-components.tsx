import { inline } from "@keystatic/core/content-components";
import { FootnotePreview } from "../components/FootnotePreview";
import { GlossaryPreview } from "../components/GlossaryPreview";
import { footprintsIcon } from "@keystar/ui/icon/icons/footprintsIcon";
import { bookAIcon } from "@keystar/ui/icon/icons/bookAIcon";
import { Icon } from "@keystar/ui/icon";
import { fields } from "@keystatic/core";
import type { Entry } from "@keystatic/core/reader";

export type FootnoteProps = Entry<typeof KeyStaticFootnoteComponent>;
export type GlossaryProps = Entry<typeof KeyStaticGlossaryComponent>;

export const KeyStaticFootnoteComponent = inline({
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
});

export const KeyStaticGlossaryComponent = inline({
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
    return <GlossaryPreview {...props.value} />;
  },
});
