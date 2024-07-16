import { inline, mark } from "@keystatic/core/content-components";
import { GlossaryPreview } from "../components/GlossaryPreview";
import { bookAIcon } from "@keystar/ui/icon/icons/bookAIcon";
import { Icon } from "@keystar/ui/icon";
import { fields } from "@keystatic/core";
import type { Entry } from "@keystatic/core/reader";
import { FootprintsIcon } from "lucide-react";

export type FootnoteProps = Entry<typeof KeyStaticFootnoteComponent>;
export type GlossaryProps = Entry<typeof KeyStaticGlossaryComponent>;

export const KeyStaticFootnoteComponent = mark({
  label: "Footnote",
  icon: <FootprintsIcon />,
  schema: {
    text: fields.text({
      label: "Inline Text",
      description: "The inline footer reference text",
      validation: {
        isRequired: true,
        length: {
          min: 1,
        },
      },
    }),
  },
  style: {
    backgroundColor: "#fbefeb",
    padding: "2px 4px",
    borderRadius: "8px",
    border: "1px solid #cacaca",
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
