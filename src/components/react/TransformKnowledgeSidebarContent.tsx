import clsx from "clsx";
import type { SideBarToolProps } from "./KnowledgeSidebar";
import { useState } from "react";
import type { PreSelectedSlugsProp } from "@components/astro/KnowledgeSidebar.astro";
import { useBreakPoint } from "./hooks/use-breakpoint";
import { ArrowLeft } from "lucide-react";

export default function TransformKnowledgeSidebarContent(
  props: SideBarToolProps & PreSelectedSlugsProp,
) {
  const lessThanLgBreakpoint = !useBreakPoint("lg");

  // THIS IS A MOBILE ONLY STATE
  const [visibleColumn, setVisibleColumn] = useState<
    "identities-col" | "assult-sub-categories-col"
  >("identities-col");

  const initialSelectedIdentitySlug =
    props.preSelectedSlugs?.identityGroupSlug ?? null;
  const initialSelectedViolenceSubCategorySlug =
    props.preSelectedSlugs?.violenceSubCategorySlug ?? null;

  const [selectedIdentitySlug, setSelectedIdentitySlug] = useState<
    string | null
  >(initialSelectedIdentitySlug);

  const [selectedViolenceSubCategorySlug, setSelectedViolenceSubCategorySlug] =
    useState<string | null>(initialSelectedViolenceSubCategorySlug);

  const { identityGroupsList, subCategoriesList, categoriesList } = props;

  if (identityGroupsList.length === 0 || subCategoriesList.length === 0) {
    return null;
  }

  const groupedSubCategoriesList = Object.groupBy(
    subCategoriesList,
    (item) => item.entry.category,
  );

  const groupedList = Object.keys(groupedSubCategoriesList).map((key) => {
    const headingText = categoriesList.find((item) => item.slug === key)?.entry
      .name;

    return {
      violenceCategorySlug: key,
      violenceCategoryName: headingText,
      subCategories: groupedSubCategoriesList[key],
    };
  });

  const getSelectionIsNotOfCurrentPage = (
    identitySlug: string | null,
    violenceSubCategorySlug: string | null,
  ) => {
    if (!identitySlug || !violenceSubCategorySlug) {
      throw new Error(
        "either identitySlug or violenceSubCategorySlug not present while evaluating if filter selection is of current page",
      );
    }
    return (
      initialSelectedIdentitySlug !== identitySlug ||
      initialSelectedViolenceSubCategorySlug !== violenceSubCategorySlug
    );
  };

  const showApplyButton = lessThanLgBreakpoint
    ? false
    : selectedViolenceSubCategorySlug && selectedIdentitySlug
    ? getSelectionIsNotOfCurrentPage(
        selectedIdentitySlug,
        selectedViolenceSubCategorySlug,
      )
    : false;

  const showAssaultSubCategoryCol = lessThanLgBreakpoint
    ? visibleColumn === "assult-sub-categories-col"
      ? true
      : false
    : true;

  const showIdentityGroupCol = lessThanLgBreakpoint
    ? visibleColumn === "identities-col"
      ? true
      : false
    : true;

  const getUrlToGoToAfterFilterSelection = (
    identitySlug: string | null,
    violenceSubCategorySlug: string | null,
  ) => {
    if (!identitySlug || !violenceSubCategorySlug) {
      throw new Error(
        "either identitySlug or violenceSubCategorySlug not present while creating the/tool page url",
      );
    }
    return `/transform/${identitySlug}-${violenceSubCategorySlug}`;
  };

  return (
    <article className="pb-20 lg:pt-10 relative">
      {showApplyButton ? (
        <div className="text-end absolute right-8 top-4">
          <a
            href={getUrlToGoToAfterFilterSelection(
              selectedIdentitySlug,
              selectedViolenceSubCategorySlug,
            )}
            className="rounded-full bg-green-600 hover:bg-green-500 px-4 py-2 text-sm text-zinc-50"
          >
            Apply
          </a>
        </div>
      ) : null}

      {/* <hr className="w-full dark:border-gray-500 h-[1px] mt-4" /> */}

      <div className="flex gap-5 w-full h-full">
        {showIdentityGroupCol ? (
          <section
            className={clsx("flex-1 py-3 px-2", {
              "animate-flash":
                !selectedIdentitySlug && selectedViolenceSubCategorySlug,
            })}
          >
            <h2 className="text-lg text-gray-700 dark:text-gray-200 mb-4 uppercase font-semibold">
              Identity Groups
            </h2>

            <ul className="flex flex-col gap-2">
              {identityGroupsList.map((identityGroup) => {
                const isSelected = selectedIdentitySlug === identityGroup.slug;

                return (
                  <li key={identityGroup.slug} role="button">
                    <input
                      type="checkbox"
                      className="hidden peer"
                      id={identityGroup.slug}
                      onChange={() => {
                        setVisibleColumn("assult-sub-categories-col");
                        setSelectedIdentitySlug(identityGroup.slug);
                      }}
                      checked={isSelected}
                    />
                    <label
                      className={clsx(
                        // common styles
                        "p-1 px-4 rounded-2xl cursor-pointer inline-block text-gray-800 relative font-medium",
                        // default styles
                        "bg-gray-transform hover:bg-gray-transform/80 text-white",
                        // dark hover common styles
                        "dark:hover:text-white dark:hover:outline dark:hover:outline-1 dark:hover:outline-gray-200",
                        // default selected styles
                        "peer-checked:text-gray-transform peer-checked:outline peer-checked:outline-green-500 peer-checked:bg-green-200",
                        // dark styles
                        "dark:text-zinc-50 dark:bg-gray-transformLight dark:hover:bg-gray-transform",
                        // dark selected styles
                        "dark:peer-checked:text-white dark:peer-checked:bg-green-800 dark:peer-checked:outline dark:peer-checked:outline-1 dark:peer-checked:outline-green-500",
                      )}
                      htmlFor={identityGroup.slug}
                    >
                      <span>{identityGroup.entry.name}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {/* <hr className="w-[1px] border-r-[1px] dark:border-gray-500 h-full" /> */}

        {showAssaultSubCategoryCol ? (
          <section
            className={clsx("flex-1 py-3 px-2", {
              "animate-flash":
                selectedIdentitySlug && !selectedViolenceSubCategorySlug,
            })}
          >
            {lessThanLgBreakpoint ? (
              <button
                className="flex items-center gap-2 my-4"
                onClick={() => {
                  setVisibleColumn("identities-col");
                }}
              >
                <ArrowLeft />
                <span>Back to Identity Groups</span>
              </button>
            ) : null}

            <ul className="flex flex-col gap-4">
              {groupedList.map((el) => {
                return (
                  <li key={el.violenceCategorySlug}>
                    <h2
                      className={clsx("text-lg mb-2 uppercase font-semibold", {
                        "text-red-600 dark:text-red-500":
                          el.violenceCategorySlug === "assault",
                        "text-orange-600 dark:text-orange-500":
                          el.violenceCategorySlug === "degradation",
                        "text-yellow-transform dark:text-yellow-500":
                          el.violenceCategorySlug === "normalisation",
                      })}
                    >
                      {el.violenceCategoryName}
                    </h2>
                    <ul className="flex flex-col gap-2">
                      {el.subCategories?.map((subCategory) => {
                        const isAssault = el.violenceCategorySlug === "assault";

                        const isDegradation =
                          el.violenceCategorySlug === "degradation";

                        const isNormalisation =
                          el.violenceCategorySlug === "normalisation";

                        const isSelected =
                          selectedViolenceSubCategorySlug === subCategory.slug;

                        return (
                          <li key={subCategory.slug} role="button">
                            <input
                              type="checkbox"
                              className="hidden peer"
                              id={subCategory.slug}
                              onChange={() => {
                                const isSamePageSelection =
                                  getSelectionIsNotOfCurrentPage(
                                    selectedIdentitySlug,
                                    subCategory.slug,
                                  );
                                if (lessThanLgBreakpoint) {
                                  if (isSamePageSelection) {
                                    // TODO note: to prevent this refresh, I'll have to make knowledge sidebar dialog a controlled component, leaving this be for time being
                                    window.location.href =
                                      getUrlToGoToAfterFilterSelection(
                                        selectedIdentitySlug,
                                        subCategory.slug,
                                      );
                                  } else {
                                    window.location.href =
                                      getUrlToGoToAfterFilterSelection(
                                        selectedIdentitySlug,
                                        subCategory.slug,
                                      );
                                  }
                                } else {
                                  setSelectedViolenceSubCategorySlug(
                                    subCategory.slug,
                                  );
                                }
                              }}
                              checked={isSelected}
                            />
                            {/* <label className="bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-600 dark:hover:bg-zinc-500 dark:text-zinc-200 hover:text-zinc-100 dark:hover:text-zinc-200 p-1 px-4 rounded-2xl cursor-pointer inline-block peer-checked:bg-green-500"> */}
                            <label
                              htmlFor={subCategory.slug}
                              className={clsx(
                                // DEFAULT STYLES
                                // text-gray-800
                                "p-1 px-4 rounded-2xl cursor-pointer inline-block relative font-medium",

                                // DARK COMMON STYLES
                                "dark:text-zinc-50 dark:hover:text-white",

                                // FOR ALL: SELECTED STYLES(DEFAULT)
                                "peer-checked:text-gray-transform peer-checked:outline peer-checked:outline-green-500 peer-checked:bg-green-200",

                                // FOR ALL: SELECTED STYLES(DARK)
                                "dark:peer-checked:text-white dark:peer-checked:bg-green-800 dark:peer-checked:outline dark:peer-checked:outline-1 dark:peer-checked:outline-green-500",

                                // FOR ALL: DARK: HOVER: COMMON STYLES
                                "dark:hover:text-white dark:hover:outline dark:hover:outline-1 dark:hover:outline-gray-200",

                                // ASSAULT: NORMAL STYLES
                                {
                                  "bg-red-transform hover:bg-red-transform/80 text-white":
                                    isAssault,
                                },

                                // ASSAULT: DARK STYLES
                                {
                                  "dark:bg-red-transform dark:hover:bg-red-transformLight":
                                    isAssault,
                                },

                                // DEGRADATION: NORMAL STYLES
                                {
                                  "bg-orange-transform hover:bg-orange-transform/80 text-white":
                                    isDegradation,
                                },
                                // DEGRADATION: DARK STYLES
                                {
                                  "dark:bg-orange-transform dark:hover:bg-orange-transformLight":
                                    isDegradation,
                                },

                                // NORMALISATION: NORMAL STYLES
                                {
                                  "bg-yellow-transform hover:bg-yellow-transform/80 text-gray-800 hover:text-gray-600":
                                    isNormalisation,
                                },
                                // NORMALISATION: DARK STYLES
                                {
                                  "dark:bg-yellow-transform dark:hover:bg-yellow-transformLight dark:text-gray-800 dark:hover:text-gray-600":
                                    isNormalisation,
                                },

                                /** @note styles that leverage tailwind default colors, is also light default palette. Mrin wanted bold colors as original, hence these are commented for posterity, in case they ever need to be experimented with. */
                                {
                                  // "bg-red-200 dark:bg-red-900 hover:bg-red-600 peer-checked:bg-red-600 dark:hover:bg-red-400 dark:text-zinc-200 hover:text-zinc-100 peer-checked:text-zinc-100 dark:hover:text-zinc-200":
                                  //   isAssault && false,
                                  // "bg-orange-200 dark:bg-orange-800 hover:bg-orange-600 peer-checked:bg-orange-600 dark:hover:bg-orange-600 dark:text-zinc-200 hover:text-zinc-100 peer-checked:text-zinc-100 dark:hover:text-zinc-200":
                                  //   isDegradation && false,
                                  // "bg-yellow-transform hover:bg-white peer-checked:bg-white peer-checked:text-yellow-transform hover:text-yellow-transform text-white peer-checked:outline peer-checked:outline-[1px] peer-checked:outline-yellow-transform hover:outline hover:outline-[1px] hover:outline-yellow-transform":
                                  //   el.violenceCategorySlug === "normalisation",
                                  // "bg-yellow-transform/30 dark:bg-yellow-transform/70 hover:bg-yellow-transform peer-checked:bg-yellow-transform hover:text-zinc-100 dark:text-zinc-200 peer-checked:text-zinc-100":
                                  //   isNormalisation && false,
                                },
                              )}
                            >
                              <span>{subCategory.entry.name}</span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
