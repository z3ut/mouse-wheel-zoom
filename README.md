# Mouse wheel zoom

Zoom html elements with mouse wheel.

[Live demo](https://z3ut.github.io/mouse-wheel-zoom/)

## Installation

```
npm i mouse-wheel-zoom
```


## Usage

```
import { mouseWheelZoom } from 'mouse-wheel-zoom';

const wz = mouseWheelZoom({
  element: document.querySelector('[data-wheel-zoom]'),
  zoomStep: .25  
});

// reset zoom
wz.reset();
```

## Description

Ispired by [Jack Moore wheelzoom](https://github.com/jackmoore/wheelzoom) This package allows to view image and copy image url after right-click on image.

For given html element mouse-wheel-zoom will replace it with inline-block div wrapper. Wrapper will have two elements - original element with absolute positioning and cloned element with zero opacity. Wrapper size will be determined by zero opacity element, original element with absolute positioning can be moved\resized with mouse.

For element

```
<img class="image" data-wheel-zoom src="./cat.jpeg">
```

Mouse-wheel-zoom will replace it with

```
<div style="display: inline-block; position: relative; overflow: hidden;">
  <img class="image" data-wheel-zoom="" src="./cat.jpeg" style="opacity: 0;">
  <img class="image" data-wheel-zoom="" src="./cat.jpeg" style="position: absolute; top: 0; left: 0;">
</div>
```

_Warning!_ Do not use for zooming html elements with id. After cloning page will have 2 elements with same id.

## Documentation

### Config object

Property | Description | Default
---|---|---
element | DOM element to zoom | none
zoomStep | Size change for each step, relative to 1 = initial size | .1

### Returned object

Method | Description
---|---
reset | Rest current zoom level and position
setSrc | Change image src
setSrcAndReset | Change image src and reset
dispose | Remove zooming element from page

## Development

Project require globally installed [parcel](https://parceljs.org/getting_started.html). Run ```npm run start``` and see demo page with live reload on [http://localhost:1234](http://localhost:1234)
