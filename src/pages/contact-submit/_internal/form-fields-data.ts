import { submitTypeSelectOptions } from "./select-options"

type CommonAttributes = {
  id: string
  required?: boolean
  info?: string
}

type SelectOptions = Array<{ value: string; text: string }>;

export type SelectFieldData = {
  type: 'select',
  text: string,
  options: SelectOptions,
  onChange?(e: React.ChangeEvent<HTMLSelectElement>): void
} & CommonAttributes

type InputTextField = {
  type: 'text' | 'email',
  text: string,
} & CommonAttributes

type InputNumberField = {
  type: 'number',
  text: string
} & CommonAttributes

type TextAreaField = {
  type: 'textarea',
  text: string,
} & CommonAttributes

type Checkbox = {
  type: 'checkbox',
  text: string,
} & CommonAttributes


type FormFieldOptions = SelectFieldData | InputTextField | TextAreaField | InputNumberField | Checkbox

export type LivedExperienceDataItem = FormFieldOptions | {
  type: 'multiple',
  info?: string,
  label: string,
  list: Array<FormFieldOptions>
}

export type LivedExperiencesDataList = Array<LivedExperienceDataItem>

export const formTypeData: SelectFieldData = {
  type: 'select' as const,
  text: 'Type',
  id: 'contactSubmitType',
  options: submitTypeSelectOptions,
  required: true,
}

export type LivedExperiencesFactoryOptions = {
  identitySelectOptions: SelectOptions
  violenceSubCategorySelectOptions: SelectOptions
}

export const getEmailIdFormFieldData = (options?: {
  required?: boolean,
  info?: string
}): InputTextField => {
  const { required, info } = options ?? {};

  return {
    type: 'email' as const,
    id: 'email' as const,
    text: 'Email ID',
    info,
    required: !!required
  }
}

const getMessageFormFieldData = (options: { text: string }): TextAreaField => {
  const { text } = options;

  return {
    type: 'textarea' as const,
    id: 'livedExperience' as const,
    text,
    required: true,
    info: 'Please note that submissions may be subject to edits by our team for clarity, conciseness, and formatting (e.g., fixing typos, extracting excerpts). We will ensure that your experiences are represented with care and respect.',
  }
}

export const getLivedExperiencesFormFieldsData = (options: LivedExperiencesFactoryOptions): LivedExperiencesDataList => {
  const { identitySelectOptions, violenceSubCategorySelectOptions } = options

  return [
    {
      type: 'text' as const,
      text: 'Name/pseudonym',
      id: 'nameOrPseudonym' as const,
      info: 'Anonymous if left empty'
    },
    {
      type: 'text' as const,
      text: 'How do you identify?',
      id: 'howDoYouIdentify' as const,
      required: true,
      info: 'Identity markers help us map the range of lived experiences and evidences submitted'
    },
    {
      type: 'multiple' as const,
      label: 'Please choose the toolkit page you would like your lived experience to be visible in',
      info: 'Please choose whichever feels most relevant to the experience you would like to share',
      list: [
        {
          type: 'select' as const,
          text: 'Identity group',
          id: 'identityGroup' as const,
          options: identitySelectOptions,
          required: true
        },
        {
          type: 'select' as const,
          text: 'Violence type',
          id: 'violenceSubCategory' as const,
          options: violenceSubCategorySelectOptions,
          required: true
        }
      ]
    },
    getMessageFormFieldData({
      text: 'Add your lived experience here',
    })
    ,
    {
      type: 'number' as const,
      id: 'age' as const,
      text: 'Age',
      info: 'We collect this information to map the age range at which trans individuals experience violence, helping us identify patterns and vulnerabilities across different life stages.',
    },
    {
      type: 'text' as const,
      id: 'location' as const,
      text: 'Location',
      info: 'We ask for this information to identify areas with less representation and to analyze how regional socio-cultural norms may contribute to violent attitudes towards trans people'
    },
    {
      type: 'textarea' as const,
      id: 'otherPagesForLivedExperience' as const,
      text: 'Any other page you would like your lived experience to appear?',
      info: "You can check the available options from the 'Please choose the toolkit page' form field above. If your options don't exist, feel free to suggest new."
    },
    {
      type: 'checkbox' as const,
      id: 'consentForLivedExperienceUse' as const,
      text: 'Are you comfortable with the transform team using your lived experience to talk about the tool on the website/other spaces?',
    },
    getEmailIdFormFieldData({
      info: "Please provide your email if you're comfortable with the team reaching out for follow-up or potential collaboration related to your shared experience."
    })
  ]
}

export const writeToUsFormFieldsData: LivedExperiencesDataList = [
  {
    type: 'text',
    text: 'Name',
    id: 'name',
    required: true,
  },
  getEmailIdFormFieldData({ required: true }),
  getMessageFormFieldData({
    text: 'Your Message',
  })
]

export const contributeToDifferentPageFormFieldsData: LivedExperiencesDataList = [
  {
    type: 'text' as const,
    id: 'name' as const,
    text: 'Name',
    info: 'We add provide credits where due!'
  },
  getEmailIdFormFieldData({
    info: "Please provide your email if you're comfortable with the team reaching out for follow-up or potential collaboration related to your shared experience."
  }),
  {
    type: 'textarea' as const,
    id: 'whatPagesContributeTo' as const,
    text: 'What page(s) would you like to contribute towards?',
    required: true,
  },
  {
    type: 'text' as const,
    id: "addYourContribution" as const,
    text: "Add your contribution here:",
    required: true,
  },
  {
    type: 'textarea' as const,
    id: 'relevantLinks' as const,
    text: 'Relevant links',
  }
]