type InitOptions = {
  responsive?: true,
  breakpointCols?: Record<string, number>,
  numCols?: number
  gap?: number
}

const defaultOptions = {
  /*
   * If `responsive` is `true`, `breakpointCols` will be used to determine
   * how many columns a grid should have at a given responsive breakpoint.
   */
  responsive: true,
  /*
   * A list of how many columns should be shown at different responsive
   * breakpoints, defined by media queries.
   */
  breakpointCols: {
    "min-width: 1500px": 6,
    "min-width: 1200px": 5,
    "min-width: 992px": 4,
    "min-width: 768px": 3,
    "min-width: 576px": 2,
  },
  /*
   * If `responsive` is `false`, this number of columns will always be shown,
   * no matter the width of the screen.
   */
  numCols: 4,
} satisfies InitOptions;

let _resizeId: number | null = null;
let _options: InitOptions = {};
let _targets: Targets = [];

type Target = HTMLElement
type Targets = HTMLElement[]
// export function init(targets?: string | NodeList[], options?: InitOptions): void
// export function destroyAll(): void
// export function refresh(target: Element, options?: InitOptions): void
// export function refreshAll(options?: InitOptions): void

export function init(targets: string | Targets, options: InitOptions = {}) {
  if (typeof targets === "string") {
    _targets = Array.from(document.querySelectorAll(targets));
  } else {
    _targets = targets;
  }

  _options = Object.assign(defaultOptions, options);

  _targets.forEach(function (target) {
    setUp(target);
    setHeight(target);
  });

  addEventListeners();

  // fade in
  _targets.forEach(el => {
    el.classList.add("loaded")
  })
}

function setUp(target: Target) {
  target.classList.add("flexmasonry");

  if (_options.responsive) {
    target.classList.add("flexmasonry-responsive");
  }

  setColsClass(target);

  Array.from(target.children).forEach(function (item) {
    item.classList.add("flexmasonry-item");
  });

  addBreakElements(target);
}

function onLoad() {
  _targets.forEach(function (target) {
    setHeight(target);
  });
}

function onResize() {
  if (_resizeId) {
    window.cancelAnimationFrame(_resizeId);
  }

  _resizeId = window.requestAnimationFrame(function () {
    refreshAll();
  });
}

function addEventListeners() {
  window.addEventListener("load", onLoad);
  window.addEventListener("resize", onResize);
}

function removeEventListeners() {
  window.removeEventListener("load", onLoad);
  window.removeEventListener("resize", onResize);
}

function setHeight<T extends HTMLElement>(target: T) {
  const currentCols = getCurrentCols();

  if (currentCols && currentCols < 2) {
    target.style.removeProperty("height");

    const targetChildren = Array.from(target.children) as HTMLElement[];
    targetChildren.forEach(function (item) {
      item.style.removeProperty("width");
    });
    return;
  }

  const heights: number[] = [];

  const targetChildren = Array.from(target.children) as HTMLElement[];

  targetChildren.forEach(function (item) {
    const currentCols = getCurrentCols();

    if (!currentCols) return

    if (!item.classList.contains("flexmasonry-break")) {
      item.style.padding = `${_options.gap}px`;
      item.style.width = `${100 / currentCols}%`;
    }

    if (item.classList.contains("flexmasonry-break")) {
      return;
    }

    const comp = window.getComputedStyle(item);
    const order = Number(comp.getPropertyValue("order"));
    const height = comp.getPropertyValue("height");

    if (!heights[order - 1]) {
      heights[order - 1] = 0;
    }
    heights[order - 1] += Math.ceil(parseFloat(height));
  });

  const maxHeight = Math.max(...heights);
  target.style.height = maxHeight + "px";
}

function addBreakElements(target: Target) {
  const breakEls = target.querySelectorAll(".flexmasonry-break");
  const currentCols = getCurrentCols();

  if (currentCols === undefined) {
    return
  }

  if (Array.from(breakEls).length === currentCols - 1) {
    return;
  }

  for (let i = 1; i < currentCols; i++) {
    const breakDiv = document.createElement("div");
    breakDiv.classList.add("flexmasonry-break");
    breakDiv.classList.add("flexmasonry-break-" + i);
    target.appendChild(breakDiv);
  }
}

function removeBreakElements(target: Target) {
  const breakEls = Array.from(target.querySelectorAll(".flexmasonry-break")) as HTMLElement[];
  const currentCols = getCurrentCols();

  if (currentCols === undefined) {
    return
  }

  if (Array.from(breakEls).length === currentCols - 1) {
    return;
  }

  Array.from(breakEls).forEach(function (breakEl) {
    breakEl.parentNode?.removeChild(breakEl);
  });
}

function setColsClass(target: Target) {
  if (target.classList.contains("flexmasonry-cols-" + getCurrentCols())) {
    return;
  }

  target.className = target.className.replace(/(flexmasonry-cols-\d+)/, "");
  target.classList.add("flexmasonry-cols-" + getCurrentCols());
}

function sortByMinWidth(arr: Array<string>): Array<string> {
  return arr.sort((a, b) => {
    const regex = /min-width:\s*(\d+)px/;

    const getNumber = (str: string): number => {
      const match = str.match(regex);
      return match ? parseInt(match[1], 10) : 0;
    };

    return getNumber(b) - getNumber(a);
  });
}


function getCurrentCols() {
  if (!_options.responsive) {
    return _options.numCols;
  }

  const keys = sortByMinWidth(Object.keys(_options.breakpointCols ?? {}));

  for (const key of keys) {
    if (window.matchMedia("(" + key + ")").matches) {
      return _options.breakpointCols?.[key];
    }
  }

  return 1;
}

export function refresh(target: Target, options = {}) {
  _options = Object.assign(defaultOptions, options);

  setColsClass(target);
  removeBreakElements(target);
  addBreakElements(target);
  setHeight(target);
}

export function refreshAll(options = {}) {
  _targets.forEach(function (target) {
    refresh(target, options);
  });
}

export function destroyAll() {
  removeEventListeners();
}
