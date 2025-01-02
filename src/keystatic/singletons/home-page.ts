import { fields, singleton } from "@keystatic/core";
import { simpleEditorOptions } from "@root/src/utils/common/simple-editor-options";

const aboutUsCard = fields.object({
  title: fields.text({
    label: 'Title',
    validation: {
      isRequired: true
    }
  }),
  titleColor: fields.select({
    label: 'Role',
    description: "The person's role at the company",
    options: [
      { label: 'Yellow', value: 'yellow' },
      { label: 'Orange', value: 'orange' },
      { label: 'Red', value: 'red' },
      { label: 'Black', value: 'black' },
    ],
    defaultValue: 'black'
  }),
  description: fields.mdx({
    label: 'Description',
    options: simpleEditorOptions
  }),
  youtubeVideoLink: fields.url({
    label: 'YouTube Video Link',
  })
})

const featureOrCollaboration = fields.object({
  title: fields.text({
    label: 'Title',
    validation: {
      isRequired: true
    }
  }),
  subTitle: fields.text({
    label: 'Sub Title',
    multiline: true
  }),
  resource: fields.conditional(
    fields.select(
      {
        label: 'Select Resource Type',
        options: [
          { label: 'Youtube Video URL', value: 'video' },
          { label: 'Link', value: 'link' }
        ],
        defaultValue: 'link'
      }
    ), {
    link: fields.object({
      text: fields.text({
        label: 'Link Text',
        validation: {
          isRequired: true
        }
      }),
      link: fields.url({
        label: 'Link URL',
        validation: {
          isRequired: true
        }
      })
    }),
    video: fields.url({
      label: 'YouTube Video Link',
    })
  }),
})

export const homePage = singleton({
  label: "Home Page",
  path: 'src/singletons-data/home-page',
  format: 'json',
  schema: {
    mainDescription: fields.text({
      label: 'Main Description',
      multiline: true,
      validation: {
        isRequired: true,
        length: {
          max: 700
        }
      }
    }),
    aboutUsCards: fields.array(
      aboutUsCard,
      {
        label: 'About Us Cards',
        itemLabel: (item) => {
          return item.fields.title.value || 'Please select a card'
        }
      }
    ),
    acknowledgementsFunders: fields.object({
      description: fields.mdx({
        label: 'Funders Description',
        options: simpleEditorOptions,
      }),
      funderImages: fields.array(
        fields.object({
          image: fields.image({
            label: 'Add Funders Image',
            directory: 'src/assets/images/home/funders',
            publicPath: '/images/home/funders'
          }),
          alt: fields.text({
            label: 'Alt Text',
            validation: {
              isRequired: true,
              length: {
                max: 600
              }
            }
          })
        }),
        {
          label: 'Funders Images',
          itemLabel: (item) => {
            return item.fields.alt.value || 'Please select an image'
          }
        }
      )
    }),
    featuresAndCollaborations: fields.array(
      featureOrCollaboration,
      {
        label: 'Features and Collaborations',
        itemLabel: (item) => {
          return item.fields.title.value || 'Please select a feature or collaboration'
        }
      }
    )
  }
})