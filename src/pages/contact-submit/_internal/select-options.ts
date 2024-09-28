export const SUBMIT_TYPE__WRITE_TO_US = "write-to-us" as const;
export const SUBMIT_TYPE__CONTRIBUTE_LIVED_EXPERIENCES = "contribute-lived-experiences" as const;
export const SUBMIT_TYPE__CONTRIBUTE_TO_DIFFERENT_PAGE = "contribute-to-different-page" as const;

export const submitTypeSelectOptions = [
  {
    value: SUBMIT_TYPE__WRITE_TO_US,
    text: "Write to us",
  },
  {
    value: SUBMIT_TYPE__CONTRIBUTE_LIVED_EXPERIENCES,
    text: "Contribute your Lived Experience(s)",
  },
  {
    value: SUBMIT_TYPE__CONTRIBUTE_TO_DIFFERENT_PAGE,
    text: 'Contribute to a different page'
  }
];

export type SubmitType = typeof submitTypeSelectOptions[number]['value'];