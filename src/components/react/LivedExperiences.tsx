import type { PreSelectedSlugsProp } from "@components/astro/Sidebars.astro";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import wretch from "wretch";
import { LoaderCircle } from "lucide-react";
import { WretchError } from "wretch/resolver";

type LivedExperiencesProps = PreSelectedSlugsProp;

export function LivedExperiencesInternal(props: LivedExperiencesProps) {
  const { identityGroupSlug, violenceSubCategorySlug } =
    props.preSelectedSlugs ?? {};

  if (!identityGroupSlug || !violenceSubCategorySlug) {
    return null;
  }

  const { data, isPending, error } = useQuery<
    Array<
      Record<
        | "name"
        | "email"
        | "identity-group"
        | "violence-sub-category"
        | "message",
        string
      >
    >
  >({
    queryKey: ["lived-experiences", identityGroupSlug, violenceSubCategorySlug],
    queryFn: async () => {
      return wretch(
        `/lived-experiences/${identityGroupSlug}__${violenceSubCategorySlug}.json`,
      )
        .get()
        .json();
    },
  });

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
      <ul className="mt-10 flex flex-col gap-4 max-w-[500px] mx-auto">
        {data.map((el, key) => {
          return (
            <li
              className="shadow-transform p-4 rounded-lg border-[1px] border-zinc-200 dark:border-zinc-800 flex flex-col gap-4"
              key={key}
            >
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-900">
                  {el.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{el.name}</p>
                  <p className="text-xs text-zinc-500">{el.email}</p>
                </div>
              </div>

              <p className="text-sm">{el.message}</p>
            </li>
          );
        })}
      </ul>
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
