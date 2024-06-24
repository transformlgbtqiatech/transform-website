import { fields, collection } from "@keystatic/core";

export const violenceSubCategory = collection({
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
      collection: "violenceCategory",
      validation: {
        isRequired: true,
      },
    }),
  },
})