import { fields, singleton } from "@keystatic/core";

export const sidebar = singleton({
  label: "The/Tool Sidebar",
  path: 'src/singletons-data/sidebar',
  format: 'json',
  schema: {
    identityGroups: fields.array(
      fields.relationship({
        label: "Identity Group",
        collection: "identityGroup",
        validation: {
          isRequired: true,
        },
      }),
      {
        label: "Identity Groups",
        itemLabel: (item) => item.value || 'Please select an identity group'
      }
    ),
    violenceSubCatories: fields.array(
      fields.relationship({
        label: "Violence Sub Category",
        collection: "violenceSubCategory",
        validation: {
          isRequired: true,
        },
      }),
      {
        label: "Violence Sub Categories",
        itemLabel: (item) => item.value || 'Please select a violence sub category'
      }
    )
  },
})