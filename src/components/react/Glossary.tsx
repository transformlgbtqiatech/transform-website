import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

type Props = {
  name: string;
  definition: string;
};

export function Glossary(props: Props) {
  const { name, definition } = props;
  return (
    <Tooltip>
      <TooltipTrigger className="border-b-2 border-dotted border-gray-400">
        {name}
      </TooltipTrigger>
      <TooltipContent className="bg-white rounded-xl">
        <p className="bg-zinc-600 rounded-xl p-2 border-[1px] text-xs text-zinc-100 shadow-tooltip max-w-md">
          {definition}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
