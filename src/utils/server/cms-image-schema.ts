import { fields } from "@keystatic/core";

type ImageAltOptions = {
  label?: string
  description?: string
  validation?: boolean
}

const IMAGE_ALT_OPTIONS = {
  label: 'Image Alt Text',
  description: 'Alt text for the image, which is a short description of what you see in the image, so that screen readers can read it for differently abled people who use screen readers or other assistive technologies. Refer https://accessibility.huit.harvard.edu/describe-content-images',
  validation: true
} as const

export const imageAltSchema = (options: ImageAltOptions = IMAGE_ALT_OPTIONS) => {
  const { label = IMAGE_ALT_OPTIONS.label, description = IMAGE_ALT_OPTIONS.description, validation = IMAGE_ALT_OPTIONS.validation } = options

  return fields.text({
    label,
    description,
    validation: validation ? {
      isRequired: true,
      length: {
        min: 1,
        max: 600
      }
    } : undefined
  })
}

type ImageOptions = Parameters<typeof fields.image>[0]

type ImageSchemaOptions = {
  imageAltOptions?: ImageAltOptions
  imageOptions: ImageOptions & {
    validation?: boolean
  }
}

export function imageSchema(options: ImageSchemaOptions) {
  const { imageAltOptions = IMAGE_ALT_OPTIONS, imageOptions } = options

  const finalImageAltOptions: ImageAltOptions = {
    ...imageAltOptions,
    validation: imageOptions.validation
  }

  const {
    label = 'Image',
    description,
    publicPath,
    validation = true
  } = imageOptions

  return fields.object({
    src: fields.image({
      label,
      description,
      publicPath,
      directory: `src/assets${publicPath}`,
      validation: {
        isRequired: !!validation
      }
    }),
    alt: imageAltSchema(finalImageAltOptions)
  })
}
