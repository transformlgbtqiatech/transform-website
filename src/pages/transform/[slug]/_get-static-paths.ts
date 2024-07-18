import { cms } from "@cms/reader";

export async function getStaticPathsToolPages() {
  const identityGroupSlugsList = await cms.collections.identityGroup.list();
  const violenceSubCategorySlugsList =
    await cms.collections.violenceSubCategory.list();
  const knowledgePosts = await cms.collections.knowledge.all({
    resolveLinkedFiles: true,
  });

  const paths = identityGroupSlugsList.flatMap((identityGroupSlug) => {
    return violenceSubCategorySlugsList.map((violenceSubCategorySlug) => {
      const knowledgePost = knowledgePosts.find((knowledgePost) => {
        return (
          knowledgePost.entry.transIdentityGroup === identityGroupSlug &&
          knowledgePost.entry.violenceSubCategory === violenceSubCategorySlug
        );
      });

      const slug = `${identityGroupSlug}-${violenceSubCategorySlug}`

      return {
        params: {
          slug,
        },
        props: {
          identityGroupSlug,
          violenceSubCategorySlug,
          knowledgePost,
        },
      };
    });
  });

  return paths;
}

