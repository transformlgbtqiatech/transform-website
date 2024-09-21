import { getCollection } from "astro:content";

export async function GET() {
  const identityGroups = await getCollection("identity-groups");
  const violenceSubCategories = await getCollection("violence-sub-categories");

  const identitySelectOptions = identityGroups.map((identityGroup) => {
    return {
      value: identityGroup.id,
      text: identityGroup.data.name,
    };
  });

  const violenceSubCategorySelectOptions = violenceSubCategories.map(
    (violenceSubCategory) => {
      return {
        value: violenceSubCategory.id,
        text: violenceSubCategory.data.name,
      };
    },
  );

  const json = {
    identityGroups: identitySelectOptions,
    violenceSubCategories: violenceSubCategorySelectOptions,
  }

  return new Response(JSON.stringify(json), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}