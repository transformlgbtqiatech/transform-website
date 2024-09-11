import type { GetStaticPaths, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export function getAffirmativeActionPageProps(
  affirmativeActionTypeId: CollectionEntry<'affirmative-action-type'>["id"],
  affirmativeActionList: CollectionEntry<"affirmative-action">[],
  actionTypes: CollectionEntry<"affirmative-action-type">[],
) {
  return {
    params: {
      type: affirmativeActionTypeId
    },
    props: {
      selectedAffirmativeActionType: affirmativeActionTypeId ?? 'fundraising-initiatives',
      list: affirmativeActionList.filter(el => el.data.type === affirmativeActionTypeId),
      types: actionTypes.map(el => {
        return {
          name: el.data.name,
          id: el.id
        }
      })
    }
  }
  // satisfies {
  //   params: {
  //     type: CollectionEntry<"affirmative-action-type">["id"]
  //   },
  //   props: {
  //     selectedAffirmativeActionType: CollectionEntry<'affirmative-action-type'>["id"],
  //     list: CollectionEntry<"affirmative-action">[]
  //     types: Array<{ name: string; id: CollectionEntry<"affirmative-action-type">["id"] }>
  //   }
  // }
}

// export type AffirmativeActionPageProps = Awaited<
//   ReturnType<typeof getAffirmativeActionPageProps>
// >

export type AffirmativeActionPageProps = InferGetStaticPropsType<typeof getAffirmativeActionPageStaticPaths>

export const getAffirmativeActionPageStaticPaths = (async () => {
  const affirmativeActionTypes = await getCollection("affirmative-action-type");
  const affirmativeActionList = await getCollection("affirmative-action");

  const retVal = affirmativeActionTypes.map((type) => {
    return getAffirmativeActionPageProps(type.id, affirmativeActionList, affirmativeActionTypes)
  })

  return retVal
}) satisfies GetStaticPaths

