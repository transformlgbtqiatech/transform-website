export const groundYourselfData = [
  {
    text: "see",
    color: "red",
  },
  {
    text: "feel",
    color: "dark-orange",
  },
  {
    text: "hear",
    color: "orange",
  },
  {
    text: "smell",
    color: "dark-yellow",
  },
  {
    text: "taste",
    color: "yellow",
  },
] as const

export type GroundYourselfIds = typeof groundYourselfData[number]['text']