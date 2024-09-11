import { useMediaQuery } from "react-responsive";
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@root/tailwind.config.ts'

const config = resolveConfig(tailwindConfig)
const breakpoints = config.theme.screens

export function useBreakPoint(breakpoint: keyof typeof breakpoints) {
  const breakpointQuery = breakpoints[breakpoint]
  return useMediaQuery({ query: `(min-width: ${breakpointQuery})` })
}