import clsx from "clsx";
import type { SideBarToolProps } from "./KnowledgeSidebar";
import { useState } from "react";
import type { PreSelectedSlugsProp } from "@components/astro/KnowledgeSidebar.astro";

function Selected() {
  return (
    <span className="absolute w-1 h-1 rounded-full p-1 text-white bg-green-500 dark:bg-green-400 top-3 -left-3" />
  );
}

export default function TransformKnowledgeSidebarContent(
  props: SideBarToolProps & PreSelectedSlugsProp,
) {
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

  return (
    <div className="pb-20 relative">
      {selectedViolenceSubCategorySlug && selectedIdentitySlug ? (
        <div className="text-end absolute right-0 -top-10">
          <a
            href={`/transform/${selectedIdentitySlug}-${selectedViolenceSubCategorySlug}`}
            className="rounded-full bg-green-600 hover:bg-green-500 px-3 py-1 text-sm text-zinc-50"
          >
            Apply
          </a>
        </div>
      ) : null}

      <hr className="w-full dark:border-gray-500 h-[1px] mt-4" />
      <div className="flex gap-5 w-full h-full">
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
                      setSelectedIdentitySlug(identityGroup.slug);
                    }}
                    checked={isSelected}
                  />
                  <label
                    className={clsx(
                      "text-gray-800 bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-200 p-1 px-4 rounded-2xl cursor-pointer inline-block relative",
                      // hover styles
                      "hover:bg-zinc-600 dark:hover:bg-zinc-500 hover:text-zinc-100 dark:hover:text-zinc-200",
                      // checked styles
                      {
                        "peer-checked:bg-zinc-600 dark:peer-checked:bg-zinc-500 peer-checked:text-zinc-100":
                          isSelected,
                      },
                    )}
                    htmlFor={identityGroup.slug}
                  >
                    <span>{identityGroup.entry.name}</span>

                    {isSelected && <Selected />}
                  </label>
                </li>
              );
            })}
          </ul>
        </section>

        {/* <hr className="w-[1px] border-r-[1px] dark:border-gray-500 h-full" /> */}

        <section
          className={clsx("flex-1 py-3 px-2", {
            "animate-flash":
              selectedIdentitySlug && !selectedViolenceSubCategorySlug,
          })}
        >
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
                              setSelectedViolenceSubCategorySlug(
                                subCategory.slug,
                              );
                            }}
                            checked={isSelected}
                          />
                          {/* <label className="bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-600 dark:hover:bg-zinc-500 dark:text-zinc-200 hover:text-zinc-100 dark:hover:text-zinc-200 p-1 px-4 rounded-2xl cursor-pointer inline-block peer-checked:bg-green-500"> */}
                          <label
                            htmlFor={subCategory.slug}
                            className={clsx(
                              "p-1 px-4 rounded-2xl cursor-pointer inline-block text-gray-800 relative",

                              // hover, dark styles
                              {
                                "bg-red-200 dark:bg-red-900 hover:bg-red-600 peer-checked:bg-red-600 dark:hover:bg-red-400 dark:text-zinc-200 hover:text-zinc-100 peer-checked:text-zinc-100 dark:hover:text-zinc-200":
                                  isAssault,
                                "bg-orange-200 dark:bg-orange-800 hover:bg-orange-600 peer-checked:bg-orange-600 dark:hover:bg-orange-600 dark:text-zinc-200 hover:text-zinc-100 peer-checked:text-zinc-100 dark:hover:text-zinc-200":
                                  isDegradation,
                                // "bg-yellow-transform hover:bg-white peer-checked:bg-white peer-checked:text-yellow-transform hover:text-yellow-transform text-white peer-checked:outline peer-checked:outline-[1px] peer-checked:outline-yellow-transform hover:outline hover:outline-[1px] hover:outline-yellow-transform":
                                //   el.violenceCategorySlug === "normalisation",
                                "bg-yellow-transform/30 dark:bg-yellow-transform/70 hover:bg-yellow-transform peer-checked:bg-yellow-transform hover:text-zinc-100 dark:text-zinc-200 peer-checked:text-zinc-100":
                                  isNormalisation,
                              },
                            )}
                          >
                            <span>{subCategory.entry.name}</span>
                            {isSelected && <Selected />}
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
      </div>
    </div>
  );
}
