/**@fileoverview this was an attempt to manually take control of rendering markdoc content. This doesn't work because I wouldn't have the control of how for example images are rendered. I need astro's understanding of markdoc and mdx, whhich is why I ended up using mdx with astro collections for time being. Turns out you don't need to define collections in `content/config` to use `getEntry`. */
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { markdocTagsForCustomRender } from "@root/mardoc";
// import { FootnotePreview } from "@cms/components/FootnotePreview";
// import { GlossaryPreview } from "@cms/components/GlossaryPreview";
// import { markdocConfig, components } from "@root/keystatic.config";

const config = {
  tags: markdocTagsForCustomRender,
};

console.info(JSON.stringify(config, null, 2));

// console.info(JSON.stringify(markdocTagsForCustomRender, null, 2));

function Footnote() {
  return <div>footnote</div>;
}

function Glossary() {
  return <div>glossary</div>;
}

const components = {
  footnote: Footnote,
  glossary: Glossary,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function KeyStaticRenderer(props: any) {
  // console.info(props);
  if (!props.content) {
    return null;
  }

  if (!props.content) {
    return null;
  }

  const errors = Markdoc.validate(props.content.node, config);

  if (errors.length) {
    console.info("ERRRROSSSSS!");
    console.info(JSON.stringify(errors, null, 2));
    // TODO add sentry or build log here
    throw new Error("Content validation failed");
  }

  const contentForRenderer = Markdoc.transform(props.content.node, config);

  const jsx = contentForRenderer
    ? Markdoc.renderers.react(contentForRenderer, React, {
        components: components,
      })
    : null;

  return <div>{jsx}</div>;
}
