// your-dialog.tsx
import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import clsx from "clsx";
import { X } from "lucide-react";

type SidebarProps = {
  uiType?: "sidebar";
};

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
  /** @description required for accessibility reasons. If you don't want to show the title, pass `titleVisuallyHidden` prop to try */
  title: string;
  titleVisuallyHidden?: boolean;
  /** @description required for accessibility reasons. If you don't want to show the description, pass `descriptionVisuallyHidden` prop to try */
  description: string;
  descriptionVisuallyHidden?: boolean;
  descriptionClassName?: string;
  /** @description If you pass widthClass, you can supply width and max-width classes */
  widthClass?: string;
  onCloseInteraction?: () => void;
}

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps &
    SidebarProps &
    React.ComponentProps<typeof DialogPrimitive.Content>
>(({ children, ...props }, forwardedRef) => {
  const {
    className,
    title,
    titleVisuallyHidden,
    description,
    descriptionVisuallyHidden,
    descriptionClassName,
    uiType,
    widthClass,
    onCloseInteraction,
    ...rest
  } = props;
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-zinc-500 opacity-75 z-40" />
      <DialogPrimitive.Content
        {...rest}
        ref={forwardedRef}
        className={clsx(
          "bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-50 overflow-y-auto",
          className,
          {
            "top-0 h-[100svh] w-80 rounded-r-[6px]": uiType === "sidebar",
            [widthClass ?? ""]: !!widthClass,
            "max-w-[450px]": !widthClass && uiType === "sidebar",
          },
        )}
      >
        <DialogPrimitive.Title
          className={clsx("text-2xl text-gray-700 dark:text-gray-200", {
            hidden: !!titleVisuallyHidden,
          })}
        >
          {title}
        </DialogPrimitive.Title>

        {titleVisuallyHidden ? (
          <VisuallyHidden.Root>{title}</VisuallyHidden.Root>
        ) : null}

        <DialogPrimitive.Description
          className={clsx("text-sm text-gray-500 dark:text-gray-300", {
            hidden: !!descriptionVisuallyHidden,
            [descriptionClassName ?? ""]: !!descriptionClassName,
          })}
        >
          {description}
        </DialogPrimitive.Description>

        {descriptionVisuallyHidden ? (
          <VisuallyHidden.Root>{description}</VisuallyHidden.Root>
        ) : null}

        {children}

        <DialogPrimitive.Close
          aria-label="Close"
          className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none focus:shadow-2xl"
          onClick={onCloseInteraction ?? (() => {})}
        >
          <X />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
