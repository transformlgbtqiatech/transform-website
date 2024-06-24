import { Dialog, DialogContent, DialogTrigger } from "@components/react/Dialog";
import { Menu as MenuIcon } from "lucide-react";
import TransformKnowledgeSidebarContent from "./TransformKnowledgeSidebarContent";

export function KnowledgeSidebar() {
  return (
    <Dialog defaultOpen>
      <DialogTrigger className="px-3 text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
        <MenuIcon />
      </DialogTrigger>
      <DialogContent
        className="fixed dark:bg-slate-600 dark:text-gray-200"
        widthClass="w-[800px] lg:max-w-[75%] max-w-full"
        title="Select identity group and sub category"
        description="Select identity group and violence sub category. Post that you'll be show the knowledge post for that group and sub category"
        descriptionClassName="max-w-[90%]"
        uiType="sidebar"
      >
        <TransformKnowledgeSidebarContent />
      </DialogContent>
    </Dialog>
  );
}
