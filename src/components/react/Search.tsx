// import * as Dialog from "@radix-ui/react-alert-dialog";
import { Dialog, DialogContent, DialogTrigger } from "@components/react/Dialog";
// @ts-expect-error: pagefind doesn't have types
import { PagefindUI } from "@pagefind/default-ui";

import { SearchIcon } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

export function Search() {
  return (
    <Dialog>
      <DialogContent
        className="fixed inset-0 lg:top-20 lg:left-1/2 lg:-translate-x-1/2 lg:bottom-auto bg-zinc-50 dark:bg-zinc-700 dark:text-gray-200 lg:rounded-2xl shadow-transform border-2 border-zinc-500 h-svh lg:h-auto lg:min-h-96 lg:max-h-[80svh]"
        widthClass="w-full lg:w-[800px] lg:max-w-[75%] max-w-full"
        title="Open Website's Navigation Menu"
        titleVisuallyHidden={true}
        description="Open Website's Navigation Menu"
        descriptionVisuallyHidden={true}
      >
        <Content />
      </DialogContent>
      <DialogTrigger className="text-white -translate-y-[2px] lg:p-3 lg:hover:bg-zinc-700 [@media(hover:none)]:bg-none rounded-full">
        <div className="hidden lg:block">
          <SearchIcon size={20} />
        </div>

        <div className="block lg:hidden">
          <SearchIcon size={22} />
        </div>
      </DialogTrigger>
    </Dialog>
  );
}

function Content() {
  const ref = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  useLayoutEffect(() => {
    if (!ref.current || hasInitialized.current) {
      return;
    }

    const pagefind = new PagefindUI({
      element: ref.current,
      showSubResults: true,
      showImages: false,
      // note: the images don't get shown in dev mode.
      // for that we'd have to hook into astro build pipeline and make page find a plugin
      // better than the `astro-pagefind` package ( it doesn't support images in dev right now)
      // 1. build plugin
      // 2. do something like this: https://claude.ai/chat/eca87065-e731-4cef-b3de-427e184492b1
      processResult: function (result: {
        url: string;
        sub_results: Array<{ url: string }>;
      }) {
        const url = result.url;

        return {
          ...result,
          sub_results: result.sub_results.map((result) => {
            return {
              ...result,
              url: result.url.replace("/client", ""),
            };
          }),
          url: url.replace("/client", ""),
        };
      },
    });

    hasInitialized.current = true;

    return () => {
      hasInitialized.current = false;
      pagefind.destroy();
    };
  }, []);

  return (
    <div className="px-0 py-6 lg:px-4">
      <div ref={ref}></div>
    </div>
  );
}
