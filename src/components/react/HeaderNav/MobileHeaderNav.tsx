import { Dialog, DialogContent, DialogTrigger } from "@components/react/Dialog";
import { ArrowRight, MenuIcon } from "lucide-react";
import { headerNavLinks } from "./links";

export function MobileHeaderNav() {
  return (
    <div className="lg:hidden translate-y-[3px]">
      <Dialog>
        <DialogTrigger className="text-zinc-100">
          <MenuIcon />
        </DialogTrigger>

        <DialogContent
          className="fixed bg-zinc-50 dark:bg-zinc-800 dark:text-gray-200 motion-safe:data-[state=closed]:animate-sidebar-unmount motion-safe:data-[state=open]:animate-sidebar will-change-transform"
          widthClass="w-[80%] lg:w-[800px] lg:max-w-[75%] max-w-full"
          title="Open Website's Navigation Menu"
          titleVisuallyHidden={true}
          description="Open Website's Navigation Menu"
          descriptionVisuallyHidden={true}
          uiType="sidebar"
        >
          <nav className="mt-10 dark:text-zinc-200 dark:bg-zinc-800">
            <ul className="flex flex-col gap-2">
              {headerNavLinks.map((el) => {
                return (
                  <li className="p-2" key={el.label}>
                    {el.children ? (
                      <>
                        <p>
                          <span>{el.label}</span>
                        </p>
                        <ul className="flex flex-col gap-1 ml-3 mt-2">
                          {el.children.map((childEl) => {
                            return (
                              <li className="p-2" key={childEl.label}>
                                <a
                                  href={childEl.href}
                                  className="flex items-center gap-2"
                                >
                                  {childEl.Icon}
                                  <span>{childEl.label}</span>
                                  <span>
                                    <ArrowRight size={16} />
                                  </span>
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    ) : (
                      <a href={el.href} className="flex items-center gap-2">
                        {el.Icon}
                        <span>{el.label}</span>
                        <span>
                          <ArrowRight size={16} />
                        </span>
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </DialogContent>
      </Dialog>
    </div>
  );
}
