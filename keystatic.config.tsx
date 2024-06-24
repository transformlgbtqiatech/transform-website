import { config } from "@keystatic/core";
import * as categories from "@cms/collections";

export const githubStorage = {
  kind: "github",
  repo: "transformlgbtqiatech/transform-website",
  branchPrefix: "cms/",
} as const;

const localStorage = {
  kind: "local",
} as const;

export default config({
  storage: import.meta.env.PROD ? githubStorage : localStorage,
  ui: {
    brand: {
      name: " ",
      mark: ({ colorScheme }) => {
        return (
          <img
            alt="transform logo"
            src={
              colorScheme === "dark"
                ? "/src/assets/images/transform-logo-white.png"
                : "/src/assets/images/transform-logo-black.png"
            }
            width={96}
            height={96}
            style={{
              objectFit: "contain",
            }}
          />
        );
      },
    },
  },
  collections: {
    ...categories,
  },
});
