// your-dialog.tsx
import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";
import { X } from "lucide-react";

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ children, ...props }, forwardedRef) => {
  const { className, ...rest } = props;
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-[#24273f] opacity-75 z-40" />
      <DialogPrimitive.Content
        {...rest}
        ref={forwardedRef}
        className={clsx(
          "top-0 h-[100svh] w-80 max-w-[450px] rounded-r-[6px] bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none overflow-y-auto z-50",
          className,
        )}
      >
        {children}
        <DialogPrimitive.Close
          aria-label="Close"
          className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none focus:shadow-2xl"
        >
          <X />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
