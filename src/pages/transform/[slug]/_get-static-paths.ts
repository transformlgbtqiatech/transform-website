import type { KnowledgePost } from "@cms/collections/collection-types";
import { getCollection } from "astro:content";

export type KnowledgePostFinal = Pick<KnowledgePost, "title" | "transIdentityGroup" | "violenceSubCategory" | "triggerWarning"> | undefined

export async function getStaticPathsToolPages() {
  const identityGroupSlugsList = (await getCollection("identity-groups")).map(item => item.id)
  const violenceSubCategorySlugsList = (await getCollection("violence-sub-categories")).map(item => item.id)
  const knowledgePosts = await getCollection("knowledge-posts")

  const paths = identityGroupSlugsList.flatMap((identityGroupSlug) => {
    return violenceSubCategorySlugsList.map((violenceSubCategorySlug) => {
      const knowledgePostData = knowledgePosts.find((knowledgePost) => {
        return (
          knowledgePost.data.transIdentityGroup === identityGroupSlug &&
          knowledgePost.data.violenceSubCategory === violenceSubCategorySlug
        );
      });

      const knowledgePost = knowledgePostData?.data as KnowledgePostFinal
      const slug = `${identityGroupSlug}-${violenceSubCategorySlug}`

      return {
        params: {
          slug,
        },
        props: {
          identityGroupSlug,
          violenceSubCategorySlug,
          knowledgePost,
          knowledgePostSlug: knowledgePostData?.slug
        },
      };
    });
  });

  return paths;
}

