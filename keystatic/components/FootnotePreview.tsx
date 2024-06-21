import { Box } from "@keystar/ui/layout";
import { footprintsIcon } from "@keystar/ui/icon/icons/footprintsIcon";
import { Icon } from "@keystar/ui/icon";

// import type keystaticConfig from "../../keystatic.config";

// type MDXField =
// (typeof keystaticConfig)["collections"]["knowledge"]["schema"]["content"];

type Props = {
  readonly inlineText: string;
  readonly footNoteText: string;
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
        <Icon UNSAFE_style={{ display: "inline" }} src={footprintsIcon} />
      </span>
    </Span>
  );
}
