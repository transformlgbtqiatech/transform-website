import { getEntry, render } from "astro:content";

export async function getToolPageContentComponents(knowledgePostSlug?: string) {
  if (!knowledgePostSlug) {
    return null;
  }


  const mainContentEntry = await getEntry("knowledge-posts", knowledgePostSlug)!;
  const recommentedReadingEntry = await getEntry(
    "knowledge-posts",
    `${knowledgePostSlug}/recommendedreading`,
  )!;

  const { Content: MainContent } = await render(mainContentEntry);
  const { Content: RecommendedReadingContent } = await render(recommentedReadingEntry);

  return {
    MainContent,
    RecommendedReadingContent,
  };
}