import { Box } from "@keystar/ui/layout";
import { FootprintsIcon } from "lucide-react";

type Props = {
  readonly inlineText: string;
};

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

export function FootnotePreview(props: Props) {
  if (props.inlineText === "") {
    return <Span>Click to configure footnote</Span>;
  }

  return (
    <Span>
      <span
        style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
      >
        {props.inlineText}
        <FootprintsIcon size={16} />
      </span>
    </Span>
  );
}
