import { Box } from "@keystar/ui/layout";
import { bookAIcon } from "@keystar/ui/icon/icons/bookAIcon";
import { Icon } from "@keystar/ui/icon";

function Span(props: { children: React.ReactNode }) {
  return (
    <Box
      elementType="span"
      backgroundColor="color.alias.backgroundSelected"
      border="color.alias.borderIdle"
      borderRadius="medium"
      paddingX="small"
      paddingY="xsmall"
    >
      {props.children}
    </Box>
  );
}

type Props = {
  glossaryTerm: string | null;
};

export function GlossaryPreview(props: Props) {
  if (props.glossaryTerm === null) {
    return <Span>Click to configure glossary term</Span>;
  }

  return (
    <Span>
      <span
        style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
      >
        {props.glossaryTerm}
        <Icon UNSAFE_style={{ display: "inline" }} src={bookAIcon} />
      </span>
    </Span>
  );
}
