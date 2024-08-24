import { Dialog, DialogContent, DialogTrigger } from "@components/react/Dialog";
import TransformKnowledgeSidebarContent from "./TransformKnowledgeSidebarContent";
import type {
  IdentityGroup,
  ViolenceCategory,
  ViolenceSubCategory,
} from "@cms/collections/collection-types";
import type { PreSelectedSlugsProp } from "@components/astro/KnowledgeSidebar.astro";
import { FilterIcon } from "lucide-react";
import { useStore } from "@nanostores/react";
import {
  knowledgeSidebarModalState as knowledgeSidebarModalState,
  tourState,
} from "@store/global";
import { walkthrough, walkthroughLS } from "@utils/client/walkthrough";

export type SideBarToolProps = {
  identityGroupsList: Array<{
    slug: string;
    entry: IdentityGroup;
  }>;
  categoriesList: Array<{
    slug: string;
    entry: ViolenceCategory;
  }>;
  subCategoriesList: Array<{
    slug: string;
    entry: ViolenceSubCategory;
  }>;
  openKnowledgeSidebarByDefault?: boolean;
};

export function KnowledgeSidebar(
  props: SideBarToolProps & PreSelectedSlugsProp & { isDetailPage: boolean },
) {
  const $knowledgeSidebarModalState = useStore(knowledgeSidebarModalState);
  const $tourState = useStore(tourState);

  const closeModal = () => {
    const walkthroughLSState = walkthroughLS.get();

    const isTourOver =
      walkthroughLSState.state === "completed" || $tourState === "over";

    // if walkthrough is ongoing, don't close the modal on regular actions
    if (!isTourOver) {
      return;
    }

    knowledgeSidebarModalState.set(false);
  };
  const openModal = () => {
    knowledgeSidebarModalState.set(true);
  };

  return (
    <div className="flex flex-row lg:flex-col gap-4">
      <Dialog
        defaultOpen={props.openKnowledgeSidebarByDefault}
        modal
        open={$knowledgeSidebarModalState}
      >
        {/* <Tooltip>
          <TooltipTrigger> */}
        <DialogTrigger
          className="focus:outline-2 focus:outline-blue-600 dark:focus:outline-outline-blue-400 focus:outline-offset-4 rounded-md"
          onClick={() => {
            openModal();
          }}
        >
          <span
            className="w-12 h-12 bg-red-transform hover:bg-red-transform/90 rounded-full text-white flex items-center justify-center"
            id="knowledge-sidebar-trigger"
          >
            <FilterIcon size={20} />
          </span>
        </DialogTrigger>
        {/* </TooltipTrigger> */}
        {/* 
          <TooltipContent className="bg-white rounded-xl">
            <p className="bg-zinc-600 rounded-xl p-2 border-[1px] text-xs text-zinc-100 shadow-transform max-w-md">
              Filters
            </p>
          </TooltipContent> */}
        {/* </Tooltip> */}
        <DialogContent
          className="fixed bg-zinc-50 dark:bg-zinc-800 dark:text-gray-200 will-change-transform motion-safe:data-[state=closed]:animate-sidebar-unmount motion-safe:data-[state=open]:animate-sidebar"
          widthClass="w-[800px] lg:max-w-[75%] max-w-full"
          title="Select identity group and sub category"
          titleVisuallyHidden={true}
          description="Select identity group and violence sub category. Post that you'll be show the knowledge post for that group and sub category"
          descriptionVisuallyHidden={true}
          descriptionClassName="max-w-[90%]"
          uiType="sidebar"
          onEscapeKeyDown={closeModal}
          onCloseInteraction={closeModal}
          onPointerDownOutside={closeModal}
        >
          <TransformKnowledgeSidebarContent {...props} />
        </DialogContent>
      </Dialog>

      <button>
        <span
          className="w-12 h-12 bg-orange-transform hover:bg-orange-transform/90 rounded-full text-white flex items-center justify-center"
          id="lived-experiences-trigger-button"
        >
          L
        </span>
      </button>

      <button
        onClick={() => {
          walkthrough({
            isDetailPage: props.isDetailPage,
            freshStart: true,
          });
        }}
      >
        <span
          className="w-12 h-12 bg-yellow-transform hover:bg-yellow-transform/90 rounded-full text-white flex items-center justify-center"
          id="walkthrough-welcome"
        >
          W
        </span>
      </button>
    </div>
  );
}
