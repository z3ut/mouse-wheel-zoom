import { mouseWheelZoom } from '../src/index.js';

const wz = mouseWheelZoom({ element: document.querySelector('[data-wheel-zoom]') });

const cat = require('./cat.jpeg');
const cats = require('./cats.jpeg');

let isCurrentImageOneCat = true;
wz.setSrc(cat);

const resetButton = document.querySelector('[data-reset-button]');
const changeImageButton = document.querySelector('[data-change-image-button]');
const disposeButton = document.querySelector('[data-dispose-button]');

resetButton.addEventListener('click', () => {
  wz.reset();
});

changeImageButton.addEventListener('click', () => {
  wz.setSrcAndReset(isCurrentImageOneCat ? cats : cat);
  isCurrentImageOneCat = !isCurrentImageOneCat;
});

disposeButton.addEventListener('click', () => {
  wz.dispose();
});
