import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => { },
    removeListener: () => { },
    addEventListener: () => { },
    removeEventListener: () => { },
    dispatchEvent: () => { },
  }),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() { }
  disconnect() { }
  observe() { }
  takeRecords() {
    return [];
  }
  unobserve() { }
} as unknown as typeof IntersectionObserver;

// Mock HTMLCanvasElement.prototype.getContext
// This fixes "Error: Not implemented: HTMLCanvasElement.prototype.getContext"
HTMLCanvasElement.prototype.getContext = (() => {
  // return a mock context if needed, or null
  return null;
}) as any;

// Mock WAAPI (Web Animations API) to fix framer-motion v12 errors
// Reference: https://github.com/framer/motion/issues/2544
if (typeof Element !== "undefined") {
  Element.prototype.animate = function () {
    return {
      finished: Promise.resolve(),
      cancel: () => { },
      finish: () => { },
      play: () => { },
      pause: () => { },
      reverse: () => { },
      addEventListener: () => { },
      removeEventListener: () => { },
    } as any;
  };
}

// Mock window.scrollTo and Element.prototype.scrollIntoView
window.scrollTo = (() => { }) as any;
Element.prototype.scrollIntoView = (() => { }) as any;
window.scroll = (() => { }) as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() { }
  disconnect() { }
  observe() { }
  unobserve() { }
} as unknown as typeof ResizeObserver;