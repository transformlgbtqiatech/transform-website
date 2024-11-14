import { fields, singleton } from "@keystatic/core";

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
  description: fields.text({
    label: 'Description',
    multiline: true,
  }),
  youtubeVideoLink: fields.url({
    label: 'YouTube Video Link',
  })
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
    )
  }
})