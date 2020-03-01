import * as m from './index.js';

declare module './index.js' {

  interface MouseWheelZoomConfig {
    element: HTMLElement;
    zoomStep?: number;
  }

  interface MouseWheelZoom {
    reset: () => void;
    setSrc: (src: string) => void;
    setSrcAndReset: (src: string) => void;
    dispose: () => void;

  }

  export function mouseWheelZoom(config: MouseWheelZoomConfig): MouseWheelZoom;
}