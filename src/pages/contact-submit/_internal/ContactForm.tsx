// import { Info as InfoIcon } from "lucide-react";
import type { ContactFormInputErrors, InitialValues } from "../index.astro";
import {
  type LivedExperiencesDataList,
  type LivedExperienceDataItem,
  formTypeData,
  getLivedExperiencesFormFieldsData,
  type LivedExperiencesFactoryOptions,
  writeToUsFormFieldsData,
  type SelectFieldData,
  contributeToDifferentPageFormFieldsData,
} from "./form-fields-data";
import { Input, Label, Select, TextArea } from "./InputFieldsUI";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@components/react/Tooltip";
import clsx from "clsx";
import type { SubmitType } from "./select-options";
import { useEffect, useState } from "react";

type ContactFormProps = {
  inputErrors: ContactFormInputErrors;
  initialValues: InitialValues;
} & LivedExperiencesFactoryOptions;

export function ContactForm(props: ContactFormProps) {
  /**
   * `contactFormHasHydratedAtom` is used to partially progressively
   * enhance contact form's `contactSubmitType` id-ed select field.
   */
  useEffect(() => {
    if (!window.contactFormHasHydrated) {
      window.contactFormHasHydrated = true;
    }
  }, []);

  const {
    identitySelectOptions,
    violenceSubCategorySelectOptions,
    initialValues,
    // inputErrors,
  } = props;

  const [type, setType] = useState<SubmitType>(
    (initialValues?.contactSubmitType as SubmitType | undefined) ??
      "write-to-us",
  );

  let formFieldsJsx: JSX.Element | null = null;

  if (type === "write-to-us") {
    formFieldsJsx = (
      <FormFieldListRenderer
        list={writeToUsFormFieldsData}
        initialValues={initialValues}
      />
    );
  }

  if (type === "contribute-lived-experiences") {
    formFieldsJsx = (
      <FormFieldListRenderer
        initialValues={initialValues}
        list={getLivedExperiencesFormFieldsData({
          identitySelectOptions,
          violenceSubCategorySelectOptions,
        })}
      />
    );
  }

  if (type === "contribute-to-different-page") {
    formFieldsJsx = (
      <FormFieldListRenderer
        list={contributeToDifferentPageFormFieldsData}
        initialValues={initialValues}
      />
    );
  }

  const typeFieldProps: SelectFieldData = {
    ...formTypeData,
    onChange(e) {
      const value = e.target.value as SubmitType;
      setType(value);
    },
  };

  let typeLabel: string | null = null;

  if (type === "write-to-us") {
    typeLabel =
      "Got feedback, ideas, or reflections? Or maybe you're excited to collaborate? Drop us a message here—we'd love to hear from you!";
  }

  if (type === "contribute-lived-experiences") {
    typeLabel =
      "Lived experience refers to knowledge acquired through direct, first-hand and personal experience. Use this section to describe your experiences of violence and transmisogyny as a trans identifying person.";
  }

  if (type === "contribute-to-different-page") {
    typeLabel =
      "Want to contribute to other pages on our website? We’d love to hear from you!";
  }

  return (
    <form className="flex flex-col gap-4 flex-1 shadow-transform border-[1px] border-zinc-200 rounded-3xl p-6 lg:p-10">
      <div className="flex flex-col gap-1">
        <FormFieldRenderer {...typeFieldProps} initialValues={initialValues} />
        {/* TODO: how does the accessibility work for this description if required? */}
        <p className="text-xs text-zinc-500 font-normal leading-3">
          {typeLabel}
        </p>
      </div>

      <div className="flex flex-col gap-5">{formFieldsJsx}</div>
    </form>
  );
}

type FormFieldListRendererProps = {
  list: LivedExperiencesDataList;
  initialValues?: InitialValues;
};

function FormFieldListRenderer(props: FormFieldListRendererProps) {
  const { list, initialValues } = props;

  return list.map((el, index) => {
    // const initialValue =
    //   el.type !== "multiple" ? initialValues?.[el.id] : undefined;

    return (
      <FormFieldRenderer
        {...el}
        key={`${el.type}-${index}`}
        initialValues={initialValues}
      />
    );
  });
}

function FormFieldRenderer(
  props: LivedExperienceDataItem & {
    initialValues?: InitialValues;
  },
) {
  const { initialValues } = props;

  if (
    props.type === "text" ||
    props.type === "email" ||
    props.type === "number"
  ) {
    const { info, id, required, type, text } = props;

    return (
      <Label
        text={<LabelWithIcon text={text} info={info} required={required} />}
      >
        <Input required={required} id={id} nameAndId={id} type={type} />
      </Label>
    );
  }

  if (props.type === "textarea") {
    const { info, id, required, text } = props;

    return (
      <Label
        text={<LabelWithIcon text={text} info={info} required={required} />}
      >
        <TextArea required={required} id={id} nameAndId={id} />
      </Label>
    );
  }

  if (props.type === "select") {
    const { info, id, required, text, options, onChange } = props;

    return (
      <Label
        text={<LabelWithIcon text={text} info={info} required={required} />}
      >
        <Select
          nameAndId={id}
          options={options}
          required={required}
          onChange={onChange}
          defaultValue={initialValues?.[id]}
        ></Select>
      </Label>
    );
  }

  if (props.type === "checkbox") {
    const { text, info, required } = props;
    return (
      <Label
        text={<LabelWithIcon text={text} info={info} required={required} />}
      >
        <input type="checkbox" required={required} />
      </Label>
    );
  }

  if (props.type === "multiple") {
    const { list, label, info } = props;

    return (
      <Label
        text={<LabelWithIcon isNestedFormListLabel text={label} info={info} />}
      >
        <div className="flex flex-col gap-5 mb-6 mt-3 lg:px-6">
          <FormFieldListRenderer list={list} />
        </div>
      </Label>
    );
  }
}

type LabelWithIconProps = {
  text: string;
  info?: string;
  required?: boolean;
  isNestedFormListLabel?: boolean;
};

function LabelWithIcon(props: LabelWithIconProps) {
  const { text, info, required, isNestedFormListLabel } = props;

  return (
    <div className="flex gap-2 items-center">
      <div>
        <span
          className={clsx({
            "text-base leading-6": !!isNestedFormListLabel,
          })}
        >
          {text}
          {required ? "*" : ""}
        </span>
        <p className="text-xs text-zinc-500 font-normal">{info}</p>
      </div>
      {/* <Info info={info} /> */}
    </div>
  );
}

// function Info(props: { info?: string }) {
//   const { info } = props;

//   if (info) {
//     return (
//       <Tooltip offet={10}>
//         <TooltipTrigger className="flex-shrink-0">
//           <InfoIcon size={12} />
//         </TooltipTrigger>

//         <TooltipContent className="bg-white rounded-xl">
//           <div className="prose prose-p:p-2 prose-p:m-0 prose-a:text-zinc-100 prose-a:underline bg-zinc-600 rounded-xl border-[1px] text-sm text-zinc-100 shadow-transform max-w-md">
//             <p>{info}</p>
//           </div>
//         </TooltipContent>
//       </Tooltip>
//     );
//   }

//   return <div className="w-3 h-full" />;
// }
