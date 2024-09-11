export const submitTypeSelectOptions = [
  {
    value: "write-to-us" as const,
    text: "Write to us",
  },
  {
    value: "contribute" as const,
    text: "Contribute",
  },
];

export type SubmitType = typeof submitTypeSelectOptions[number]['value'];