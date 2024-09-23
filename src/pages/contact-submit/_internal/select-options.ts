export const submitTypeSelectOptions = [
  {
    value: "write-to-us" as const,
    text: "Write to us",
  },
  {
    value: "contribute-lived-experiences" as const,
    text: "Contribute your Lived Experience(s)",
  },
  {
    value: "contribute-to-different-page" as const,
    text: 'Contribute to a different page'
  }
];

export type SubmitType = typeof submitTypeSelectOptions[number]['value'];