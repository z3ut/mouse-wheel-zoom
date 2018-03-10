import { mouseWheelZoom } from '../src/index.js';

const wz = mouseWheelZoom({ element: document.querySelector('[data-wheel-zoom]') });

const resetButton = document.querySelector('[data-reset-button]');
resetButton.addEventListener('click', () => { wz.reset(); });
