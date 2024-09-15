import { atom } from "nanostores"

export const theme = atom("light");
export const tourState = atom<'inert' | 'started' | 'over'>('inert')
export const knowledgeSidebarModalState = atom(false)
export const livedExperiencesModalState = atom(false)