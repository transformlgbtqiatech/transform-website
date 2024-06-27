/** @fileoverview I was following the templates/next of keystatic repo to see how they are rendering their own markdoc files. This is not used currently because we ended up using mdx and astro collections, since astro `getEntry` worked without definition content collection config. */
import { KeyStaticFootnoteComponent, KeyStaticGlossaryComponent } from "@cms/keystatic-config-components/keystatic-config-components";
import { fields } from "@keystatic/core";

export const markdocTagsForCustomRender = fields.markdoc.createMarkdocConfig({
  components: {
    footnote: KeyStaticFootnoteComponent,
    glossary: KeyStaticGlossaryComponent,
  },
  render: {
    tags: {
      footnote: "Footnote",
      glossary: "Glossary",
    },
  },
}).tags;
