import { Dialog, DialogContent, DialogTrigger } from "@components/react/Dialog";
import { Menu as MenuIcon } from "lucide-react";
import TransformKnowledgeSidebarContent from "./TransformKnowledgeSidebarContent";
import type {
  IdentityGroup,
  ViolenceCategory,
  ViolenceSubCategory,
} from "@cms/collections/collection-types";
import type { PreSelectedSlugsProp } from "@components/astro/KnowledgeSidebar.astro";

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
  props: SideBarToolProps & PreSelectedSlugsProp,
) {
  return (
    <Dialog defaultOpen={props.openKnowledgeSidebarByDefault} modal>
      <DialogTrigger className="px-3 text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
        <MenuIcon />
      </DialogTrigger>
      <DialogContent
        className="fixed bg-zinc-50 dark:bg-zinc-800 dark:text-gray-200 motion-safe:data-[state=closed]:animate-sidebar-unmount motion-safe:data-[state=open]:animate-sidebar will-change-transform"
        widthClass="w-[800px] lg:max-w-[75%] max-w-full"
        title="Select identity group and sub category"
        description="Select identity group and violence sub category. Post that you'll be show the knowledge post for that group and sub category"
        descriptionClassName="max-w-[90%]"
        uiType="sidebar"
      >
        <TransformKnowledgeSidebarContent {...props} />
      </DialogContent>
    </Dialog>
  );
}
