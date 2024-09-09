/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { cms } from "@cms/reader";

type RegionalArchivesMedium =
  | CollectionEntry<"regional-archive-medium">
  | {
    id: "all";
    data: any;
    collection: "regional-archive-medium";
  };

type RegionalArchivesMediumIds = RegionalArchivesMedium["id"]

export async function getAllRegionalArchivePages() {
  const allPages: Array<{
    params: {
      path: string;
    };
    props: {
      regionalLanguages: Array<{ language: string; id: RegionalLanguagesCollectionItem["id"] }>;
      regionalArchivesMediums: Array<RegionalArchivesMedium>;
      regionalArchivesList: RegionalArchivesList;
      selectedLanguageId: RegionalLanguagesCollectionItem["id"];
      selectedMediumId: RegionalArchivesMediumIds;
    };
  }> = [];

  const regionalArchivesMediums = await getRegionalArchivesMediusList();
  const regionalLanguages = await getRegionalLanguagesList();

  for await (const language of regionalLanguages) {
    const languageId = language.id ?? 'english'
    const regionalArchivesList = await getRegionalArchivesList(languageId, 'all');

    allPages.push({
      params: {
        path: language.id,
      },
      props: {
        regionalLanguages,
        regionalArchivesMediums,
        regionalArchivesList,
        selectedLanguageId: languageId,
        selectedMediumId: 'all'
      },
    });

    for await (const medium of regionalArchivesMediums) {
      const mediumId = medium.id ?? 'all'
      const regionalArchivesList = await getRegionalArchivesList(languageId, mediumId);

      allPages.push({
        params: {
          path: `${language.id}/${medium.id}`,
        },
        props: {
          regionalLanguages,
          regionalArchivesMediums,
          regionalArchivesList,
          selectedLanguageId: languageId,
          selectedMediumId: mediumId
        },
      });
    }
  }

  return allPages;
}

export async function getRegionalArchivesMediusList() {
  const regionalArchivesMediumsList = await getCollection(
    "regional-archive-medium",
  );

  const regionalArchivesMediums = [
    ...regionalArchivesMediumsList,
    {
      id: "all",
      data: {
        name: "All Mediums",
      },
    },
  ] as Array<RegionalArchivesMedium>;

  return regionalArchivesMediums;
}

type RegionalLanguagesCollectionItem = CollectionEntry<"regional-archives-languages">

export async function getRegionalLanguagesList() {
  const regionalLanguages: Array<{ language: string; id: RegionalLanguagesCollectionItem["id"] }> = (
    await getCollection("regional-archives-languages")
  ).map((item) => {
    return {
      ...item.data,
      id: item.id,
    };
  });

  return regionalLanguages;
}

type RegionalArchivesList = Awaited<ReturnType<typeof getRegionalArchivesList>>

export async function getRegionalArchivesList(
  language: RegionalLanguagesCollectionItem["id"],
  medium: RegionalArchivesMediumIds
) {
  let regionalArchives = await getCollection("regional-archive");

  regionalArchives = await Promise.all(
    regionalArchives.map(async (el) => {
      const mediumData = await cms.collections.regionalArchiveMedium.read(
        el.data.medium,
      );

      const languageData = await cms.collections.regionalArchivesLanguage.read(
        el.data.language,
      );

      const retVal = {
        ...el,
        data: {
          ...el.data,
          medium: mediumData?.name,
          language: languageData?.language,
          languageId: el.data.language,
          mediumId: el.data.medium,
        },
      }

      return retVal;;
    }),
  );

  regionalArchives = regionalArchives.filter(el => {
    const retVal = el.data.languageId === language && (medium === 'all' ? true : el.data.mediumId === medium)
    return retVal
  })


  return regionalArchives
}

export type RegionalArchivesPageProps = Awaited<
  ReturnType<typeof getAllRegionalArchivePages>
>[number]["props"];