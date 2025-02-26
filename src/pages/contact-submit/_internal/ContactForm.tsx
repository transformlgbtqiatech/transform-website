import { Turnstile } from "@marsidev/react-turnstile";
import { X } from "lucide-react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import type { InitialValues } from "../index.astro";
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
import {
  CLOUDFLARE_TURNSTILE_SITE_KEY,
  CLOUDFLARE_DEV_TURNSTILE_SITE_ALWAYS_PASSES_VISIBLE_KEY,
  // CLOUDFLARE_DEV_TURNSTILE_SITE_ALWAYS_BLOCKS_VISIBLE_KEY,
} from "astro:env/client";

const cloudFlareTurnstileSiteKey = import.meta.env.PROD
  ? CLOUDFLARE_TURNSTILE_SITE_KEY
  : CLOUDFLARE_DEV_TURNSTILE_SITE_ALWAYS_PASSES_VISIBLE_KEY;
// CLOUDFLARE_DEV_TURNSTILE_SITE_ALWAYS_BLOCKS_VISIBLE_KEY;

import clsx from "clsx";
import type { SubmitType } from "./select-options";
import { useEffect, useRef, useState } from "react";
import { actions, isActionError, isInputError } from "astro:actions";
import { CloudflareError } from "./CloudflareError";
import { resetAllExcept } from "@root/src/utils/client/reset-selected-form-fields";

type InputErrors = Record<string, string[]> | null;

type ContactFormProps = {
  inputErrorsFromServer: InputErrors;
  initialValues: InitialValues;
} & LivedExperiencesFactoryOptions;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

export function ContactForm(props: ContactFormProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ContactFormInternal {...props} />
    </QueryClientProvider>
  );
}

function ContactFormInternal(props: ContactFormProps) {
  const [inputErrors, setInputErrors] = useState<InputErrors>(
    props.inputErrorsFromServer,
  );

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
        inputErrors={inputErrors}
      />
    );
  }

  if (type === "contribute-lived-experiences") {
    const list = getLivedExperiencesFormFieldsData({
      identitySelectOptions,
      violenceSubCategorySelectOptions,
    });

    formFieldsJsx = (
      <FormFieldListRenderer
        inputErrors={inputErrors}
        initialValues={initialValues}
        list={list}
      />
    );
  }

  if (type === "contribute-to-different-page") {
    formFieldsJsx = (
      <FormFieldListRenderer
        list={contributeToDifferentPageFormFieldsData}
        initialValues={initialValues}
        inputErrors={inputErrors}
      />
    );
  }

  const typeFieldProps: SelectFieldData = {
    ...formTypeData,
    onChange(e) {
      const value = e.target.value as SubmitType;
      setType(value);
      setInputErrors(null);
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

  const formRef = useRef<HTMLFormElement | null>(null);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return actions.submitContactForm(formData);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (d) => {
      const { error, data } = d;

      if (
        isActionError(error) &&
        (error?.code === "FORBIDDEN" ||
          error?.code === "CONFLICT" ||
          error?.code === "BAD_REQUEST")
      ) {
        toast.error(
          <div className="relative pt-2">
            <CloudflareError errorCode={error?.code} />
            <button className="absolute -top-2 -right-2">
              <X
                size={14}
                onClick={() => {
                  toast.dismiss();
                }}
              />
            </button>
          </div>,
          {
            duration: Infinity,
          },
        );
        return;
      }

      if (error && isInputError(error)) {
        setInputErrors(error.fields);
      } else {
        setInputErrors(null);
      }

      if (!error && data) {
        if (formRef.current) {
          resetAllExcept(formRef.current, ["contactSubmitType"]);
        }

        if (data.input.contactSubmitType === "contribute-lived-experiences") {
          toast.success(
            <div className="text-sm">
              <button className="absolute top-2 right-2">
                <X
                  size={14}
                  onClick={() => {
                    toast.dismiss();
                  }}
                />
              </button>

              <div>
                <span>Thanks for your lived experience submission 🌻.</span>{" "}
                <span>
                  After it's accepted by our moderators, it'll show on the lived
                  experiences section of{" "}
                  <a
                    href={`/transform/${data.input.identityGroup}-${data.input.violenceSubCategory}`}
                    className="underline"
                  >
                    this page
                  </a>
                </span>
              </div>
            </div>,
            {
              duration: Infinity,
            },
          );
        }

        if (
          data.input.contactSubmitType === "contribute-to-different-page" ||
          data.input.contactSubmitType === "write-to-us"
        ) {
          toast.success("Thanks for your submission 🌻");
        }
      }
    },
  });

  return (
    <>
      <Toaster />
      <form
        ref={formRef}
        method="POST"
        action="?_astroAction=submitContactForm"
        // only for dev
        // noValidate={true}
        className="flex flex-col gap-4 flex-1 shadow-transform border-[1px] border-zinc-200 rounded-3xl p-6 lg:p-10"
        onSubmit={async (e) => {
          e.preventDefault();
          setInputErrors(null);
          const target = e.target as HTMLFormElement;
          const formData = new FormData(target);
          mutation.mutate(formData);
        }}
      >
        <div className="flex flex-col gap-1">
          <FormFieldRenderer
            {...typeFieldProps}
            initialValues={initialValues}
          />
          {/* TODO: how does the accessibility work for this description if required? */}
          <p className="text-xs text-zinc-500 font-normal leading-4">
            {typeLabel}
          </p>
        </div>

        <div className="flex flex-col gap-5">{formFieldsJsx}</div>

        <Turnstile
          siteKey={cloudFlareTurnstileSiteKey}
          key={`${type}-${mutation.isPending}`}
        />

        <button
          className={clsx(
            "text-center font-medium text-white lg:w-fit px-5 py-2 rounded-full",
            {
              "bg-green-500": !mutation.isPending,
              "bg-zinc-500 pointer-events-none cursor-not-allowed":
                mutation.isPending,
            },
          )}
          onClick={() => {
            if (mutation.isPending) {
              return;
            }
          }}
        >
          {mutation.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
}

type FormFieldListRendererProps = {
  list: LivedExperiencesDataList;
  initialValues?: InitialValues;
  inputErrors?: InputErrors;
};

function FormFieldListRenderer(props: FormFieldListRendererProps) {
  const { list, initialValues, inputErrors } = props;

  return list.map((el, index) => {
    return (
      <FormFieldRenderer
        {...el}
        key={`${el.type}-${index}`}
        initialValues={initialValues}
        inputErrors={inputErrors}
      />
    );
  });
}

function makeErrorString(errors: string[] = []) {
  return errors.join(", ");
}

function ErrorMessage(props: { error?: string[] }) {
  if (!props.error) {
    return null;
  }

  return (
    <p className="text-xs text-red-500 mt-1">{makeErrorString(props.error)}</p>
  );
}

function FormFieldRenderer(
  props: LivedExperienceDataItem & {
    initialValues?: InitialValues;
    inputErrors?: InputErrors;
  },
) {
  const { initialValues, inputErrors } = props;

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
        <ErrorMessage error={inputErrors?.[id]} />
      </Label>
    );
  }

  if (props.type === "textarea") {
    const { info, id, required, text, min, max } = props;

    const conditionalTextAreaProps: { minlength?: number; maxlength?: number } =
      {};
    if (min) conditionalTextAreaProps.minlength = min;
    if (max) conditionalTextAreaProps.maxlength = max;

    return (
      <div>
        <Label
          text={<LabelWithIcon text={text} info={info} required={required} />}
        >
          <TextArea
            required={required}
            id={id}
            nameAndId={id}
            {...conditionalTextAreaProps}
          />

          {conditionalTextAreaProps.maxlength ? (
            <p className="text-xs text-zinc-500 italic text-right">
              Maximum {conditionalTextAreaProps.maxlength} characters allowed
            </p>
          ) : null}
        </Label>
        <div className="-mt-2">
          <ErrorMessage error={inputErrors?.[id]} />
        </div>
      </div>
    );
  }

  if (props.type === "select") {
    const { info, id, required, text, options, onChange } = props;

    return (
      <div>
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
        <ErrorMessage error={inputErrors?.[id]} />
      </div>
    );
  }

  if (props.type === "checkbox") {
    const { text, info, required, id } = props;
    return (
      <div>
        <Label
          text={<LabelWithIcon text={text} info={info} required={required} />}
        >
          <input
            type="checkbox"
            name="consentForLivedExperienceUse"
            required={required}
          />
        </Label>
        <ErrorMessage error={inputErrors?.[id]} />
      </div>
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
    </div>
  );
}
