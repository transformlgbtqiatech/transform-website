import type { Entry } from "@keystatic/core/reader";
import * as singletons from './'

export type TeamSingleton = Entry<typeof singletons.team>