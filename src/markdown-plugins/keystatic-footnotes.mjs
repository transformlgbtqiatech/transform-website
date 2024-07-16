import { visit } from "unist-util-visit";
import { createHash } from "node:crypto";

export function generateId(text) {
  return createHash("md5").update(text).digest("hex").slice(0, 8);
}

export function keystaticFootnotes() {
  return (tree) => {
    const textOccurrences = new Map();

    visit(tree, "mdxJsxTextElement", (node, index, parent) => {
      if (node.name === "Footnote") {
        const textAttr = node.attributes.find((attr) => attr.name === "text");
        const text = textAttr?.value ?? "footnote";

        // unique id generation
        let occurenceCount = textOccurrences.get(text) || 0;
        occurenceCount++;
        textOccurrences.set(text, occurenceCount);

        const baseId = generateId(text);
        const uniqueId =
          occurenceCount > 1 ? `${baseId}-${occurenceCount}` : baseId;

        const footnoteReference = {
          type: "footnoteReference",
          label: text,
          identifier: `footnote-${uniqueId}`,
        };

        const footerDefinitionNodes = node.children.filter(
          (el) => el.type === "text" || el.type === "link",
        );

        const footnoteDefinition = {
          type: "footnoteDefinition",
          identifier: `footnote-${uniqueId}`,
          label: text,
          children: footerDefinitionNodes,
        };

        parent.children.splice(index + 1, 0, footnoteReference);
        parent.children.push(footnoteDefinition);
      }
    });
  };
}
