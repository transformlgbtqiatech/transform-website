import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { headerNavLinks } from "./links";
// import { Search } from "@components/react/Search";

export function DesktopHeaderNav() {
  return (
    <NavigationMenu.Root className="relative z-[1] w-fit justify-center hidden lg:block">
      <NavigationMenu.List className="center m-0 flex flex-wrap list-none text-white p-1">
        {headerNavLinks.map((el) => {
          if (!el.children) {
            return (
              <NavigationMenu.Item key={el.href}>
                <NavigationMenu.Link
                  className="hover:bg-zinc-700 focus:shadow-zinc-200 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 uppercase font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                  href={el.href}
                >
                  {el.label}
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          }

          return (
            <NavigationMenu.Item key={el.label}>
              <NavigationMenu.Trigger className="hover:bg-zinc-700 focus:shadow-zinc-200 group flex select-none items-center justify-between gap-[2px] rounded-md px-3 pr-1 py-2 uppercase font-medium leading-none outline-none focus:shadow-[0_0_0_2px] -translate-y-[2px]">
                {el.label}{" "}
                <ChevronDown
                  size={20}
                  className="relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                  aria-hidden
                />
              </NavigationMenu.Trigger>

              <NavigationMenu.Content className="data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight absolute top-0 left-0 shadow-transform shadow-zinc-300 bg-zinc-800 text-white rounded-md">
                <ul className="m-0 flex flex-col list-none p-6 w-80">
                  {el.children.map((childEl) => {
                    return (
                      <li key={childEl.href}>
                        <NavigationMenu.Link
                          className="hover:bg-zinc-700 focus:shadow-zinc-200 group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 uppercase font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                          href={childEl.href}
                        >
                          {childEl.label}
                        </NavigationMenu.Link>
                      </li>
                    );
                  })}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          );
        })}

        <NavigationMenu.Indicator className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-10 flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
          <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-zinc-500 dark:bg-zinc-200" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
        <NavigationMenu.Viewport className="data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)] dark:border-2 dark:border-zinc-600 shadow-transform border-t-2 border-zinc-500" />
      </div>
    </NavigationMenu.Root>
  );
}
