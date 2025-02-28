import type { PreSelectedSlugsProp } from "@components/astro/Sidebars.astro";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import wretch from "wretch";
import { LoaderCircle } from "lucide-react";
import { WretchError } from "wretch/resolver";
import {
  LivedExperienceCard,
  type LivedExperienceCardProps,
} from "./LivedExperienceCard";

type LivedExperiencesProps = PreSelectedSlugsProp & {
  isDetailPage: boolean;
};

export function LivedExperiencesInternal(props: LivedExperiencesProps) {
  const { identityGroupSlug, violenceSubCategorySlug } =
    props.preSelectedSlugs ?? {};

  // I had decided to fetch the data from an api when I thought all of the lived experiences would need to be shown here. But that we have separated `/lived-experience/*` pages we don't really need to do this, but keeping it as is. Ideally it would have been just a prop pass (by reading it in astro component) and show those array of lived experiences.
  const { data, isPending, error } = useQuery<Array<LivedExperienceCardProps>>({
    queryKey: ["lived-experiences", identityGroupSlug, violenceSubCategorySlug],
    queryFn: async () => {
      return wretch(
        `/lived-experiences/${identityGroupSlug}__${violenceSubCategorySlug}.json`,
      )
        .get()
        .json();
    },
  });

  if (!props.isDetailPage) {
    return (
      <div className="mt-10 flex flex-col gap-4 max-w-[500px] mx-auto">
        You'll see lived experiences here once you open a tool page by clicking
        the red filter button after you close this dialog box.
      </div>
    );
  }

  if (!identityGroupSlug || !violenceSubCategorySlug) {
    return null;
  }

  if (isPending) {
    return (
      <div className="h-[calc(100svh-80px)] flex items-center justify-center animate-spin">
        <LoaderCircle />
      </div>
    );
  }

  if (error) {
    if (error instanceof WretchError) {
      if (error.status === 404) {
        return (
          <div className="h-[calc(100svh-80px)] flex items-center justify-center">
            <p>No lived experiences yet.</p>
          </div>
        );
      }
    }

    return (
      <div className="h-[calc(100svh-80px)] flex items-center justify-center">
        <p>Something unexpected went wrong. We're on it.</p>
      </div>
    );
  }

  if (data.length > 0) {
    return (
      <div className="flex flex-col gap-5 lg:px-10">
        <ul className="mt-10 flex flex-col gap-4">
          {data
            .filter((el) => el.showOnToolPage === "TRUE")
            .map((el, key) => {
              return (
                <li key={key}>
                  <LivedExperienceCard {...el} />
                </li>
              );
            })}
        </ul>

        <a
          href={`/lived-experiences/${identityGroupSlug}--${violenceSubCategorySlug}`}
          className="text-sky-500 dark:text-sky-400 text-sm ml-1"
        >
          Read All Lived Experiences
        </a>
      </div>
    );
  }

  return null;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

export function LivedExperiences(props: LivedExperiencesProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <h2 className="text-2xl font-medium">Lived Experiences</h2>
      <LivedExperiencesInternal {...props} />
    </QueryClientProvider>
  );
}
