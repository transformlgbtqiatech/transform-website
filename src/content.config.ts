import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const affirmativeAction = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/affirmative-action"
  }),
})

export const affirmativeActionType = defineCollection({
  loader: glob({
    pattern: "*.json",
    base: "./src/content/affirmative-action-type"
  }),
})

export const glossary = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx,mdoc}",
    base: "./src/content/glossary"
  }),
})

export const identityGroups = defineCollection({
  loader: glob({
    pattern: "*.yaml",
    base: "./src/content/identity-groups"
  }),
  schema: z.object({
    name: z.string()
  })
})

export const knowledgePosts = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx,mdoc}",
    base: "./src/content/knowledge-posts"
  }),
})

export const regionalArchive = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx,mdoc}",
    base: "./src/content/regional-archive"
  }),
})

export const regionalArchiveMedium = defineCollection({
  loader: glob({
    pattern: "*.json",
    base: "./src/content/regional-archive-medium"
  }),
})

export const regionalArchivesLanguage = defineCollection({
  loader: glob({
    pattern: "*.yaml",
    base: "./src/content/regional-archives-languages"
  })
})

export const triggerWarningContentPosts = defineCollection({
  loader: glob({
    pattern: "*.mdx",
    base: "./src/content/trigger-warning-content-posts"
  })
})

export const violenceCategories = defineCollection({
  loader: glob({
    pattern: "*.yaml",
    base: "./src/content/violence-categories"
  }),
})

export const violenceSubCategories = defineCollection({
  loader: glob({
    pattern: "*.yaml",
    base: "./src/content/violence-sub-categories"
  }),
  schema: z.object({
    name: z.string(),
    category: z.string()
  })
})


export const collections = {
  'affirmative-action': affirmativeAction,
  'affirmative-action-type': affirmativeActionType,
  'glossary': glossary,
  'identity-groups': identityGroups,
  'knowledge-posts': knowledgePosts,
  'regional-archive': regionalArchive,
  'regional-archive-medium': regionalArchiveMedium,
  'regional-archives-languages': regionalArchivesLanguage,
  'trigger-warning-content-posts': triggerWarningContentPosts,
  'violence-categories': violenceCategories,
  'violence-sub-categories': violenceSubCategories,
};