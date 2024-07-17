export type LogoProps = {
  // logoSchema?: "opposite" | "same" | "show-white-bg-logo" | "show-black-bg-logo";
  /** 
   * If `toggle-opposite` then if the theme is light, the logo with black background will be shown and vice versa.
   * If `toggle-same` then if the theme is light, the logo with white background will be shown and vice versa.
   * If `white-bg-logo` then the logo with white background will be shown in both light and dark theme.
   * If `black-bg-logo` then the logo with black background will be shown in both light and dark theme.
   */
  behaviour?: "toggle-opposite" | "toggle-same" | "white-bg-logo" | "black-bg-logo";
};
