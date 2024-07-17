import { getEntry } from "astro:content";
import type { KnowledgePost } from "./index.astro";

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