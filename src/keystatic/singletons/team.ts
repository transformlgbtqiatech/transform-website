import { fields, singleton } from "@keystatic/core";

const person = fields.object({
  name: fields.text({
    label: 'Name',
    validation: {
      isRequired: true
    }
  }),
  occupation: fields.text({
    label: 'Occupation',
    validation: {
      isRequired: true
    }
  }),
  bio: fields.text({
    label: 'Bio',
    multiline: true,
    validation: {
      isRequired: true
    }
  }),
  image: fields.image({
    label: 'Image',
    directory: 'src/assets/images/team',
    publicPath: '/images/team/'
  }),
  socials: fields.blocks({
    website: {
      label: 'Website',
      schema: fields.url({
        label: 'Website URL',
      })
    },
    instagram: {
      label: 'Instagram',
      schema: fields.url({
        label: 'Instagram URL',
      })
    },
    linkedin: {
      label: 'LinkedIn',
      schema: fields.url({
        label: 'LinkedIn URL',
      })
    },
    twitter: {
      label: 'Twitter',
      schema: fields.url({
        label: 'Twitter URL',
      })
    },
    youtube: {
      label: 'YouTube',
      schema: fields.url({
        label: 'YouTube URL',
      })
    }
  }, {
    label: 'Social Links'
  })
})

export const team = singleton({
  label: 'Our Team',
  path: 'src/singletons-data/team',
  format: 'json',
  schema: {
    members: fields.array(
      person,
      {
        label: 'Team',
        itemLabel: (item) => {
          return item.fields.name.value || 'Please select a person'
        }
      }
    ),
    alumni: fields.array(
      person,
      {
        label: 'Alumni',
        itemLabel: (item) => {
          return item.fields.name.value || 'Please select a person'
        }
      }
    )
  }
})