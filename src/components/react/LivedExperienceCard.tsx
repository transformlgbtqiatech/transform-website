import type { ContributeLivedExperiencesInputKeys } from "@root/src/actions/submit-contact-form";
import type { CollectionEntry } from "astro:content";

export type LivedExperienceCardProps = Record<
  | Exclude<
      ContributeLivedExperiencesInputKeys,
      "cf-turnstile-response" | "contactSubmitType"
    >
  | "livedExperienceEdited"
  | "showOnToolPage",
  string
> & {
  showFilters?: boolean;
  identityGroupsList?: Array<NonNullable<CollectionEntry<"identity-groups">>>;
  violenceSubCategoryList?: Array<
    NonNullable<CollectionEntry<"violence-sub-categories">>
  >;
};

export const LivedExperienceCard = (props: LivedExperienceCardProps) => {
  const {
    showFilters = false,
    identityGroupsList = [],
    violenceSubCategoryList = [],
  } = props;

  return (
    <div className="p-4 flex flex-col gap-4 rounded-2xl shadow-transform border-2 border-zinc-100 dark:border-zinc-900 dark:bg-zinc-900">
      <div className="flex gap-2 items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-700">
          <span className="dark:text-zinc-300">
            {props?.nameOrPseudonym?.charAt(0)
              ? props?.nameOrPseudonym?.charAt(0)
              : "A"}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-medium dark:text-zinc-100">
            {props.nameOrPseudonym ? props.nameOrPseudonym : "Anonymous"}
          </span>

          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {props.howDoYouIdentify}
          </span>
        </div>
      </div>

      <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg flex flex-col gap-2">
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-300 font-medium">
            Age and place when it happened
          </p>

          <p className="text-zinc-900 dark:text-zinc-200 text-sm font-semibold">
            {props.ageAndLocationWhenItHappened}
          </p>
        </div>

        {showFilters ? (
          <>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-300 font-medium">
                Identity Group
              </p>

              <p className="text-zinc-900 dark:text-zinc-200 text-sm font-semibold">
                {
                  identityGroupsList.find((el) => el.id === props.identityGroup)
                    ?.data.name
                }
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-300 font-medium">
                Violence Category
              </p>

              <p className="text-zinc-900 dark:text-zinc-200 text-sm font-semibold">
                {
                  violenceSubCategoryList.find(
                    (el) => el.id === props.violenceSubCategory,
                  )?.data.name
                }
              </p>
            </div>
          </>
        ) : null}
      </div>

      {/* <hr className="border-zinc-300 dark:border-zinc-600" /> */}
      <p className="text-sm whitespace-pre-wrap dark:text-zinc-300">
        {props.livedExperienceEdited}
      </p>
    </div>
  );
};
