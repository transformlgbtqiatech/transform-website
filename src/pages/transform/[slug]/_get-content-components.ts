import { getEntry, type CollectionEntry } from "astro:content";

type KnowledgePost = CollectionEntry<"knowledge-posts">

export async function getToolPageContentComponents(knowledgePostSlug?: KnowledgePost["slug"]) {
  if (!knowledgePostSlug) {
    return null;
  }

  const mainContentEntry = await getEntry("knowledge-posts", knowledgePostSlug);
  const recommentedReadingEntry = await getEntry(
    "knowledge-posts",
    `${knowledgePostSlug}/recommendedreading`,
  );

  const { Content: MainContent } = await mainContentEntry.render();
  const renderDataRecommendedReading = await recommentedReadingEntry?.render();

  return {
    MainContent,
    RecommendedReadingContent: renderDataRecommendedReading?.Content,
  };
}