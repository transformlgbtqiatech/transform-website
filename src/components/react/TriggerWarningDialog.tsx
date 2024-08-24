import * as Dialog from "@radix-ui/react-alert-dialog";
import { useStore } from "@nanostores/react";
import { tourState as tourStateAtom } from "@store/global";
// import { X } from "lucide-react";

export type TriggerWarningDialogProps = {
  type?: string | null;
};

// Mrinalini and Jo favoured the walkthrough dialog instead of this trigger warning dialog
export function TriggerWarningDialog(props: TriggerWarningDialogProps) {
  if (!props.type) {
    return null;
  }

  if (props.type === "trigger-warning-for-knowledge-posts") {
    return <TriggerWarningDialogContent />;
  }

  if (props.type === "trigger-warning-generic") {
    return <TriggerWarningDialogContent />;
  }

  return null;
}

function TriggerWarningDialogContent() {
  const $tourState = useStore(tourStateAtom);
  const isOpen = $tourState === "over";

  const closeDialog = () => {
    tourStateAtom.set("inert");
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Overlay className="fixed inset-0 bg-zinc-800/50 z-40 backdrop-blur-md" />
      <Dialog.Content
        className="fixed top-0 bottom-0 lg:bottom-auto lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 bg-zinc-100 will-change-transform w-[800px] lg:max-w-[75%] max-w-full py-10 px-6 lg:px-12 pb-12 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] z-50 dark:bg-black dark:text-zinc-200 lg:rounded-3xl lg:max-h-[90svh] overflow-y-auto flex flex-col"
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
      >
        {/* <SlatTransform3ColorsCols /> */}

        <Dialog.Title className="uppercase italic text-2xl font-bold">
          <span>Sensitive And Triggering Information Ahead</span>
        </Dialog.Title>

        <Dialog.Description
          asChild
          className="dark:text-zinc-200 text-xs lg:text-base"
        >
          <div className="mt-5 text-zinc-800 font-medium">
            <p>
              The following section talks about various forms of violence and
              transmisogynistic behaviour inflicted on transgender people
              including mentions of verbal assault, cyberbullying,
              transmedicalism, violence within legal frameworks, documentation,
              scapegoating and jailing transgender people. There are also
              mentions of assault from various people known and unknown to the
              trans-person.
            </p>

            <br />

            <p>
              Please proceed with caution as you navigate through these pages,
              and access our trigger toolkit from the main menu if need to stop
              viewing this content.
            </p>
          </div>
        </Dialog.Description>

        <div className="flex flex-col lg:flex-row gap-2 lg:gap-5 mt-auto lg:mt-10">
          <a
            href="/trigger-toolkit"
            className="inline-block bg-gray-transform text-white p-2 px-4 rounded-lg hover:bg-gray-transformLight dark:border-2 text-center lg:text-left"
          >
            Take me to the Trigger/Toolkit
          </a>

          <Dialog.Cancel
            className="bg-gray-transform text-white p-2 px-4 rounded-lg hover:bg-gray-transformLight dark:border-2"
            onClick={closeDialog}
          >
            Continue to Transform: The/Tool
          </Dialog.Cancel>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

// function SlatTransform3ColorsCols() {
//   return (
//     <div className="grid grid-cols-3">
//       <div className="h-7 relative overflow-hidden after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-red-transform after:skew-x-[-45deg] after:origin-top-left" />

//       <div className="h-7 skew-x-[-45deg] bg-orange-transform"></div>

//       <div className="h-7 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-yellow-transform before:skew-x-[-45deg] before:origin-bottom-left" />
//     </div>
//   );
// }
