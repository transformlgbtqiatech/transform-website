import type { Tour, StepOptions } from "shepherd.js";
// import type { WalkthroughLSState } from "./walkthrough";
import { waitFor } from "./wait-for";
import { offset } from "@floating-ui/dom";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@root/tailwind.config.mjs";

const config = resolveConfig(tailwindConfig);
const breakpoints = config.theme.screens;

const buttonClasses = "!bg-gray-transform hover:!bg-gray-transformLight dark:border-2 !rounded-lg !text-sm !text-white"

export type WalkthroughStepsFactoryOptions = {
  tour: Tour,
}

function conditionalEntry(
  condition: boolean,
  key: string,
  value: StepOptions,
): [string, StepOptions][] {
  return condition ? [[key, value]] : [];
}


export const walkthroughStepsFactory = (options: WalkthroughStepsFactoryOptions): void => {
  const { tour } = options

  const steps: [string, StepOptions][] = [
    ['walkthroughInit', {
      id: "walkthrough-welcome",
      canClickTarget: false,
      text: "Show me how to use Transform",
      attachTo: {
        element: '#walkthrough-welcome',
        on: "bottom-start",
      },
      buttons: [
        {
          // bg-gray-transform text-white p-2 px-4 rounded-lg hover:bg-gray-transformLight dark:border-2
          text: "Begin Walkthrough",
          action: tour.next,
          classes: buttonClasses,
        },
        {
          text: "Skip Walkthrough",
          action: tour.complete,
          classes: buttonClasses,
        },
      ],
      floatingUIOptions: {
        middleware: [offset({ mainAxis: 10 })],
      },
      modalOverlayOpeningRadius: 24
    }],
    ['filter', {
      id: "filter-trigger-step",
      text: "Click this button",
      attachTo: {
        element: "#knowledge-sidebar-trigger",
        on: "bottom-start",
      },
      floatingUIOptions: {
        middleware: [offset({ mainAxis: 10 })],
      },
      advanceOn: {
        event: 'click',
        selector: '#knowledge-sidebar-trigger'
      },
      modalOverlayOpeningRadius: 24,
    }],
    ['identityCol', {
      id: "identity-groups-col-step",
      modalOverlayOpeningRadius: 12,
      beforeShowPromise: async () => {
        let resolvedValue: HTMLElement | null = null
        try {
          resolvedValue = await waitFor(() => {
            return new Promise((resolve, reject) => {
              const el = document.querySelector(".identity-group-item-label") as HTMLElement | null
              if (el) {
                resolve(el)
              } else {
                reject('Not found')
              }
            })
          }, {
            timeout: 700
          })
        } catch (error) {
          // TODO handle error
        }

        return resolvedValue
      },
      attachTo: {
        element() {
          return document.querySelector(".identity-group-item-label") as HTMLElement
        },
        on: "bottom-start",
      },
      text: 'Select this identity group',
      floatingUIOptions: {
        middleware: [offset({ mainAxis: 10 })],
      },
      advanceOn: {
        event: 'click',
        selector: '.identity-group-item-label'
      }
    }],
    ['violenceCol', {
      id: "violence-groups-col-step",
      modalOverlayOpeningRadius: 12,
      beforeShowPromise: async () => {
        let resolvedValue: HTMLElement | null = null
        try {
          resolvedValue = await waitFor(() => {
            return new Promise((resolve, reject) => {
              const el = document.querySelector(".walkthrough-violence-group-item-label") as HTMLElement | null
              if (el) {
                resolve(el)
              } else {
                reject('Not found')
              }
            })
          }, {
            timeout: 700
          })
        } catch (error) {
          // TODO handle error
        }

        return resolvedValue
      },
      attachTo: {
        element() {
          return document.querySelector(".walkthrough-violence-group-item-label") as HTMLElement
        },
        on: "bottom-start",
      },
      text: 'Select this violence group',
      floatingUIOptions: {
        middleware: [offset({ mainAxis: 10 })],
      },
      advanceOn: {
        event: 'click',
        selector: '.walkthrough-violence-group-item-label'
      }
    }],
    ...conditionalEntry(getIsLarge(), 'filterApply', {
      id: "sidebar-filter-apply-step",
      modalOverlayOpeningRadius: 16,
      beforeShowPromise: async () => {
        let resolvedValue: HTMLElement | null = null
        try {
          resolvedValue = await waitFor(() => {
            return new Promise((resolve, reject) => {
              const el = document.querySelector("#walkthrough-apply-button") as HTMLElement | null
              if (el) {
                resolve(el)
              } else {
                reject('Not found')
              }
            })
          }, {
            timeout: 700
          })
        } catch (error) {
          // TODO handle error
        }

        return resolvedValue
      },
      text: 'Click the apply button',
      attachTo: {
        element() {
          return document.querySelector("#walkthrough-apply-button") as HTMLElement
        },
        on: "bottom-start",
      },
      floatingUIOptions: {
        middleware: [offset({ mainAxis: 10 })],
      },
      advanceOn: {
        event: 'click',
        selector: '#walkthrough-apply-button'
      }
    }),
    ['overview', {
      id: "overview-step",
      text: 'A new page will open, which will give you an overview about the trans group you chose chose experiences the violence type you choose',
      attachTo: {
        element: '#tool-page-overview-heading',
        on: "bottom-start",
      },
      floatingUIOptions: {
        middleware: [offset({ mainAxis: 14 })],
      },
      modalOverlayOpeningRadius: 10,
      modalOverlayOpeningPadding: 4,
      buttons: [
        {
          text: "Next",
          action: tour.next,
          classes: buttonClasses,
        },
      ],
    }],
    ['pageGeneralInfo', {
      id: "page-general-info-step",
      text: 'The purpose of this page is to help trace how the normalization of transmisogynistic and transphobic acts leads to abuse and assault by domestic circles for this identity group.',
      floatingUIOptions: {
        middleware: [offset({ mainAxis: 10 })],
      },
      buttons: [
        {
          text: "Next",
          action: tour.next,
          classes: buttonClasses,
        }
      ]
    }],
    ['glossary', {
      id: "glossary-step",
      text: 'Hover, click or tap over words with a dotted line for their meanings. Access our full glossary <a href="/glossary" class="underline" target="_blank" rel="noreferrer">here</a>.',
      attachTo: {
        element: '.js-glossary-tooltip-trigger',
        on: "bottom-start"
      },
      floatingUIOptions: {
        middleware: [offset({ mainAxis: 10 })],
      },
      buttons: [
        {
          text: "Next",
          action: tour.next,
          classes: buttonClasses,
        },
      ],
      modalOverlayOpeningRadius: 4,
    }],
    ['recommendedReading', {
      id: "recommended-reading-step",
      text: 'Each page also includes footnotes and further recommended reading',
      attachTo: {
        element: '#recommended-reading',
        on: "bottom"
      },
      floatingUIOptions: {
        middleware: [offset({ mainAxis: 10 })],
      },
      buttons: [
        {
          text: "Next",
          action: tour.next,
          classes: buttonClasses,
        },
      ],
      scrollTo: true,
      // modalOverlayOpeningRadius: 4,
    }],
    ['livedExperiences', {
      id: "lived-experiences-step",
      text: "This is the Lived Experiences section",
      attachTo: {
        element: '#lived-experiences-trigger-button',
        on: "bottom-start",
      },
      buttons: [
        {
          text: "Next",
          action: tour.next,
          classes: buttonClasses,
        },
      ],
      floatingUIOptions: {
        middleware: [offset({ mainAxis: 10 })],
      },
      modalOverlayOpeningRadius: 24,
      scrollTo: true,
    }],
    ['walkthroughComeBack', {
      id: "walkthrough-come-back-step",
      canClickTarget: false,
      text: "Come back here anytime to repeat the walkthrough",
      attachTo: {
        element: '#walkthrough-welcome',
        on: "bottom-start",
      },
      buttons: [
        {
          // bg-gray-transform text-white p-2 px-4 rounded-lg hover:bg-gray-transformLight dark:border-2
          text: "Next",
          action: tour.next,
          classes: buttonClasses,
        },
      ],
      floatingUIOptions: {
        middleware: [offset({ mainAxis: 10 })],
      },
      modalOverlayOpeningRadius: 24
    }],
    ['triggerWarning', {
      id: "trigger-warning-step",
      title: 'Trigger Warning',
      text: 'We deal with sensitive and triggering information.',
      floatingUIOptions: {
        middleware: [offset({ mainAxis: 10 })],
      },
      buttons: [
        {
          text: "Show me the trigger toolkit",
          action: () => {
            // window.location.href = '/trigger-toolkit'
            window.open('/trigger-toolkit', '_blank')
          },
          classes: buttonClasses,
        },
        {
          text: 'Begin using trans/form',
          action: tour.complete,
          classes: buttonClasses,
        }
      ]
    }]
  ]

  const map = new Map<string, StepOptions>(steps)
  const stepsList = Array.from(map.entries())

  stepsList.forEach(([_, step], index) => {
    const finalStep = {
      ...step,
      buttons: [
        ...step.buttons ? step.buttons : [],
        ...(index === 0 || index === stepsList.length - 1 ? [] : [{
          text: "",
          classes: "!p-0 !m-0 !bg-transparent walkthrough-back absolute bottom-2 right-4",
          action: tour.back,
        }])
      ]
    }
    tour.addStep(finalStep)
  })
}

function getIsLarge() {
  const mediaQueryString = `(min-width: ${breakpoints.lg})`;
  return window.matchMedia(mediaQueryString).matches;
}
