import { config, fields, collection } from "@keystatic/core";
import { inline } from "@keystatic/core/content-components";
import { FootnotePreview } from "./keystatic/components/FootnotePreview";
import { GlossaryPreview } from "./keystatic/components/GlossaryPreview";
import { footprintsIcon } from "@keystar/ui/icon/icons/footprintsIcon";
import { bookAIcon } from "@keystar/ui/icon/icons/bookAIcon";
import { Icon } from "@keystar/ui/icon";

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
                ? "/src/assets/transform-logo-white.png"
                : "/src/assets/transform-logo-black.png"
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
    identityGroups: collection({
      label: "Trans Identity Groups",
      slugField: "name",
      path: "src/content/identity-groups/*",
      entryLayout: "form",
      schema: {
        name: fields.slug({
          name: {
            label: "Name",
            description: "The name of the identity group",
            validation: {
              isRequired: true,
            },
          },
        }),
      },
    }),
    violenceCategories: collection({
      label: "Violence Categories",
      slugField: "name",
      path: "src/content/violence-categories/*",
      schema: {
        name: fields.slug({
          name: {
            label: "Name",
            description: "The name of the violence category",
            validation: {
              isRequired: true,
            },
          },
        }),
      },
    }),
    violenceSubCategories: collection({
      label: "Violence Sub Categories",
      slugField: "name",
      path: "src/content/violence-sub-categories/*",
      schema: {
        name: fields.slug({
          name: {
            label: "Name",
            description: "The name of the violence category",
            validation: {
              isRequired: true,
            },
          },
        }),
        descriptiveText: fields.text({
          label: "Descriptive Text",
          description:
            "An optional short, descriptive text of this sub category. This will be used to show the top title of the sub category in the knowledge content. If not provided, the 'name' above will be used instead. For example for a sub category called 'murder', the descriptive text could be 'Murder, Homicide and Fatal Violence'.",
        }),
        category: fields.relationship({
          label: "Violence Category",
          description: "The violence category this subcategory belongs to",
          collection: "violenceCategories",
          validation: {
            isRequired: true,
          },
        }),
      },
    }),
    glossary: collection({
      label: "Glossary",
      slugField: "name",
      path: "src/content/glossary/*",
      schema: {
        name: fields.slug({
          name: {
            label: "Name",
            description: "The name of glossary term",
            validation: {
              isRequired: true,
            },
          },
        }),
        definition: fields.text({
          label: "Definition",
          multiline: true,
          validation: {
            isRequired: true,
          },
        }),
      },
    }),
    knowledge: collection({
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
          description:
            "The trans identity group this knowledge post belongs to",
          collection: "identityGroups",
          validation: {
            isRequired: true,
          },
        }),
        violenceSubCategory: fields.relationship({
          label: "Violence Sub Category",
          description:
            "The violence sub category this knowledge post belongs to",
          collection: "violenceSubCategories",
          validation: {
            isRequired: true,
          },
        }),
        recommendedReading: fields.mdx({
          label: "Recommended Reading",
        }),
      },
    }),
    triggerWarningContentPosts: collection({
      label: "Trigger Warning Content Posts",
      slugField: "title",
      path: "src/content/trigger-warning-content-posts/*",
      entryLayout: "content",
      format: {
        contentField: "content",
      },
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            description:
              "Although this title is not used anywhere in the UI, it helps to create a unique id for this knowledge post. This title, if required, could be used as a title of this trigger warning post in the future, if need be.",
            validation: {
              isRequired: true,
            },
          },
        }),
        content: fields.mdx({
          label: "Content",
        }),
      },
    }),
  },
});
