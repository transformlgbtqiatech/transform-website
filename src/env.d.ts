/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface Window {
  themeValue?: "light" | "dark";
  contactFormHasHydrated?: boolean;
}