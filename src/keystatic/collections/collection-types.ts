import type { Entry } from '@keystatic/core/reader';
import * as collections from './'

export type IdentityGroup = Entry<typeof collections.identityGroup>
export type ViolenceSubCategory = Entry<typeof collections.violenceSubCategory>
export type ViolenceCategory = Entry<typeof collections.violenceCategory>
export type KnowledgePost = Entry<typeof collections.knowledge>