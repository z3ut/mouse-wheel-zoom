import * as m from './index.js';

declare module './index.js' {

  interface MouseWheelZoomConfig {
    element: HTMLElement;
    zoomStep: number;
  }

  interface MouseWheelZoom {
    reset: () => void;
  }

  export function line(config?: MouseWheelZoomConfig): MouseWheelZoom;
}