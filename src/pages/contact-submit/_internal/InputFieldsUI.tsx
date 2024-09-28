import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import { createElement } from "react";

type LabelProps = React.InputHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
  text: string | JSX.Element;
  tag?: keyof JSX.IntrinsicElements;
};

export const labelTextClass =
  "text-sm text-zinc-800 dark:text-zinc-200 font-semibold";

export function Label(props: LabelProps) {
  const { className, id, text, children, tag, ...rest } = props;

  return createElement(
    tag ?? "label",
    {
      className: clsx(["flex flex-col gap-2", className ?? ""]),
      ...(id ? { id } : {}),
      ...rest,
    },
    [
      createElement("span", { className: labelTextClass, key: 1 }, text),
      createElement("div", { key: 2 }, children),
    ],
  );

  // return (
  //   <label
  //     className={clsx(["flex flex-col gap-2", className ?? ""])}
  //     {...(id ? { id } : {})}
  //   >
  //     <span className={labelTextClass}>{text}</span>

  //     <div>{children}</div>
  //   </label>
  // );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  nameAndId: string;
};

export function Input(props: InputProps) {
  const { type, nameAndId, id, name, ...rest } = props;

  return (
    <input
      id={nameAndId ?? id}
      name={nameAndId ?? name ?? id}
      type={type}
      className="bg-white border-[1px] border-zinc-400 rounded-md p-1 px-3 text-zinc-700 font-medium w-full placeholder:text-zinc-400 placeholder:font-normal"
      // transition:persist
      {...rest}
    />
  );
}

type SelectProps = {
  nameAndId: string;
  options: Array<{ value: string; text: string }>;
} & React.InputHTMLAttributes<HTMLSelectElement>;

export function Select(props: SelectProps) {
  const { nameAndId, options, id, ...rest } = props;
  return (
    <div className="inline-block relative w-full">
      <select
        // transition:persist
        name={nameAndId ?? id}
        id={nameAndId ?? id}
        className={clsx([
          "bg-white border-[1px] border-zinc-400 rounded-md p-1 px-3 text-zinc-700 font-medium placeholder:text-zinc-400 placeholder:font-normal w-full appearance-none",
        ])}
        {...rest}
      >
        {options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>

      <div className="absolute right-2 top-[7px] pointer-events-none">
        <ChevronDownIcon size={20} />
      </div>
    </div>
  );
}

type TextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className"
> & {
  nameAndId: string;
};

export function TextArea(props: TextAreaProps) {
  const { nameAndId, id, name, ...rest } = props;

  return (
    <textarea
      // transition:persist
      name={nameAndId ?? name ?? id}
      id={nameAndId ?? id}
      className="bg-white border-[1px] border-zinc-400 rounded-md py-2 px-3 leading-6 text-zinc-700 font-medium w-full placeholder:text-zinc-400 placeholder:font-normal"
      rows={5}
      {...rest}
    />
  );
}
