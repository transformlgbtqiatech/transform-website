import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

type Props = {
  name: string;
  children: React.ReactNode;
};

export function Glossary(props: Props) {
  const { name, children } = props;
  return (
    <Tooltip>
      <TooltipTrigger className="border-b-2 border-dotted border-gray-400">
        <span className="js-glossary-tooltip-trigger">{name}</span>
      </TooltipTrigger>
      <TooltipContent className="bg-white rounded-xl z-50">
        <div className="prose prose-p:p-2 prose-p:m-0 prose-a:text-zinc-100 prose-a:underline bg-zinc-600 rounded-xl border-[1px] text-sm text-zinc-100 shadow-transform max-w-md">
          {children}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
