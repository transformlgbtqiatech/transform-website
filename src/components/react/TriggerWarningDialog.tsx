import * as Dialog from "@radix-ui/react-alert-dialog";
// import { X } from "lucide-react";

export type TriggerWarningDialogProps = {
  type?: string | null;
};

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
  return (
    <Dialog.Root defaultOpen>
      <Dialog.Overlay className="fixed inset-0 bg-zinc-800 z-40" />
      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-100 will-change-transform w-[800px] lg:max-w-[75%] max-w-full p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] z-50 dark:bg-black dark:text-zinc-200">
        {/* <Dialog.Close
          aria-label="Close"
          className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none focus:shadow-2xl"
        >
          <X />
        </Dialog.Close> */}

        <div className="mt-4">
          <SlatTransform3ColorsCols />
        </div>

        <Dialog.Title className="font-oswald uppercase italic text-2xl font-semibold mt-5">
          <span className="text-red-transform">Warning: </span>
          <span>Sensitive And Triggering Information Ahead</span>
        </Dialog.Title>

        <Dialog.Description asChild className="dark:text-zinc-200">
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

        <div className="mt-6 flex flex-col lg:flex-row gap-2">
          <a
            href="/trigger-toolkit"
            className="inline-block bg-gray-transform text-white p-2 px-4 rounded-sm hover:bg-gray-transformLight dark:border-2"
          >
            Take Me To Trigger Toolkit
          </a>

          <Dialog.Cancel className="bg-gray-transform text-white p-2 px-4 rounded-sm hover:bg-gray-transformLight dark:border-2">
            Continue to Transform
          </Dialog.Cancel>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

function SlatTransform3ColorsCols() {
  return (
    <div className="grid grid-cols-3">
      <div className="h-7 relative overflow-hidden after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-red-transform after:skew-x-[-45deg] after:origin-top-left" />

      <div className="h-7 skew-x-[-45deg] bg-orange-transform"></div>

      <div className="h-7 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-yellow-transform before:skew-x-[-45deg] before:origin-bottom-left" />
    </div>
  );
}
