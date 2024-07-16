// import { inline } from "@keystatic/core/content-components";
// import type { Config } from "@markdoc/markdoc";
import { config } from "@keystatic/core";
import * as categories from "@cms/collections";

export const githubStorage = {
  kind: "github",
  repo: "transformlgbtqiatech/transform-website",
  branchPrefix: "cms/",
} as const;

const localStorage = {
  kind: "local",
} as const;

export default config({
  storage: import.meta.env.PROD ? githubStorage : localStorage,
  ui: {
    brand: {
      name: " ",
      mark: ({ colorScheme }) => {
        return (
          <img
            alt="transform logo"
            src={
              colorScheme === "dark"
                ? "/src/assets/images/transform-logo-white.png"
                : "/src/assets/images/transform-logo-black.png"
            }
            width={96}
            height={96}
            style={{
              objectFit: "contain",
            }}
          />
        );
      },
    },
  },
  collections: {
    ...categories,
  },
});

// @note: see comment in `src/components/react/KeyStaticRenderer.tsx`
// export const components = {
//   footnote: inline({
//     label: "Footnote",
//     schema: {
//       inlineText: fields.text({
//         label: "Inline Text",
//         validation: {
//           isRequired: true,
//         },
//       }),
//       footNoteText: fields.text({
//         label: "Footnote Text",
//         multiline: true,
//         validation: {
//           isRequired: true,
//         },
//       }),
//     },

//     NodeView: () => {
//       return <div>footnote</div>;
//     },
//   }),
//   glossary: inline({
//     label: "Glossary",
//     schema: {
//       inlineText: fields.text({
//         label: "Inline Text",
//         validation: {
//           isRequired: true,
//         },
//       }),
//       footNoteText: fields.text({
//         label: "Footnote Text",
//         multiline: true,
//         validation: {
//           isRequired: true,
//         },
//       }),
//     },

//     NodeView: () => {
//       return <div>glosssary</div>;
//     },
//   }),
// };

// const tags = fields.markdoc.createMarkdocConfig({
//   components,
//   render: {
//     tags: {
//       footnote: "Footnote",
//       glossary: "Glossary",
//     },
//   },
// }).tags;

// export const markdocConfig: Config = {
//   tags,
// };
