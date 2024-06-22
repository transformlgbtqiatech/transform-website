import { Dialog, DialogContent, DialogTrigger } from "@components/react/Dialog";
import { Menu as MenuIcon } from "lucide-react";

export function KnowledgeSidebar() {
  return (
    <Dialog>
      <DialogTrigger className="px-3 text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
        <MenuIcon />
      </DialogTrigger>
      <DialogContent className="fixed !max-w-[1000px]">
        <div>Check</div>
      </DialogContent>
    </Dialog>
  );
}
