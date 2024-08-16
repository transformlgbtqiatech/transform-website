import Shepherd from "shepherd.js";
import { tourState as tourStateAtom } from "@store/global";
import { walkthroughStepsFactory } from "./walkthrough-steps";

export const walkthroughLSInitState: WalkthroughLSState = {
  state: "",
  currentPage: "",
  firstPageStepsDone: false
}

export const walkthroughLS = {
  get() {
    const walkthroughLS = localStorage.getItem('walkthrough')
    let walkthroughLSObject: WalkthroughLSState = walkthroughLSInitState;

    // recover
    if (walkthroughLS) {
      walkthroughLSObject = JSON.parse(walkthroughLS)
    }

    return walkthroughLSObject
  },
  update(newObj: Partial<WalkthroughLSState>) {
    const currentLSState = this.get()

    const toSet = {
      ...currentLSState,
      ...newObj
    }

    localStorage.setItem('walkthrough', JSON.stringify(toSet))
  },
  reset() {
    localStorage.setItem('walkthrough', JSON.stringify(walkthroughLSInitState))
    return this.get()
  }
}

// function updateWalkthroughLSState(isDetailPage: boolean) {

//   // check if walkthrough is in progress
//   const walkthroughLSValue = walkthroughLS.get()

//   if (isDetailPage) {
//     walkthroughLS.update({ currentPage: 'detail' })
//   } else {
//     walkthroughLS.update({ currentPage: 'home' })
//   }

//   // // walkthrough hasn't started yet
//   // if (!walkthroughLSValue.state) {
//   //   const toSet: Partial<WalkthroughLSState> = { state: 'started' }

//   //   if (isDetailPage) {
//   //     toSet.firstPage = 'detail'
//   //   } else {
//   //     toSet.firstPage = 'home'
//   //   }

//   //   walkthroughLS.update(toSet)
//   // }

//   // in progress walkthrough, the walkthrough function has been called again === the second page walkthrough resume
//   if (walkthroughLSValue.state === 'started') {
//     // walkthrough has started
//     const toSet: Partial<WalkthroughLSState> = {}

//     // if (walkthroughLSValue.firstPage === 'home') {
//     //   if (isDetailPage) {
//     //     toSet.secondPage = 'detail'
//     //   }
//     // }

//     // if (walkthroughLSValue.firstPage === 'detail') {
//     //   if (isDetailPage) {
//     //     toSet.secondPage = 'detail-2'
//     //   }
//     // }

//     walkthroughLS.update(toSet)
//   }

//   return walkthroughLS.get()
// }

type TOptions = {
  isDetailPage: boolean;
  freshStart?: boolean;
}

export function walkthrough(options: TOptions) {
  const { freshStart = false } = options

  if (freshStart) {
    walkthroughLS.reset()
  }

  // const latestWalkthroughLSValue = updateWalkthroughLSState(isDetailPage)

  const $tourState = tourStateAtom.get()

  // already going through walkthrough don't do anything on the same page
  if ($tourState === 'started') {
    return
  }

  const tour = new Shepherd.Tour({
    tourName: "how-to-use-transform",
    useModalOverlay: true,
    defaultStepOptions: {
      classes: "!py-2 !border-2 !border-zinc-300 shadow-transform",
    },
  });

  // EVENTS
  tour.on('start', () => {
    tourStateAtom.set("started");
  })

  tour.on("complete", () => {
    tourStateAtom.set("over");
    walkthroughLS.update({ state: 'completed' })
    window.scroll(0, 0)
  });

  tour.on('show', ({ step }) => {
    if (step.id === 'phantom-step') {
      walkthroughLS.update({ firstPageStepsDone: true })
    }
  })

  walkthroughStepsFactory({
    tour,
    // currentPage: latestWalkthroughLSValue.currentPage,
    // firstPageStepsDone: latestWalkthroughLSValue.firstPageStepsDone
  })

  tour.start();
}

export type WalkthroughLSState = {
  state: "completed" | "started" | "";
  currentPage: "home" | "detail" | "",
  firstPageStepsDone: boolean
}