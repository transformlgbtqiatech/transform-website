import { fields, collection } from "@keystatic/core";


export const regionalArchiveMedium = collection({
  label: "Regional Archives Mediums",
  slugField: 'name',
  path: "src/content/regional-archive-medium/*",
  format: 'json',
  schema: {
    name: fields.slug({
      name: {
        label: 'Name',
        validation: {
          isRequired: true
        }
      }
    })
  }
})