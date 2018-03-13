function mouseWheelZoom({ element, zoomStep = .1 } = {}) {
  let containerElement;
  let backgroundElement;

  let currentTop;
  let currentLeft;
  let currentZoomLevel;
  let currentWidth;
  let currentHeight;

  let previousMouseMoveEvent;

  let isDisposed = false;
  let isDragging = false;

  initialize();

  function initialize() {
    createElementWrappers();
    resetCurrentPosition();
    subscribeToEvents();
  }
  
  function createElementWrappers() {
    containerElement = document.createElement('div');
    containerElement.setAttribute('style',
      'display: inline-block; position: relative; overflow: hidden;');

    element.parentNode.replaceChild(containerElement, element);
    element.setAttribute('style', 'position: absolute; top: 0; left: 0;');

    backgroundElement = element.cloneNode();
    backgroundElement.setAttribute('style', 'opacity: 0;');

    containerElement.insertBefore(backgroundElement, null);
    
    containerElement.insertBefore(element, null);
    
    element.style.maxWidth = 'none';
    element.style.maxHeight = 'none';
  }

  function subscribeToEvents() {
    element.addEventListener('wheel', onElementMouseWheel);
    element.addEventListener('mousedown', onElementMouseDown);
    element.addEventListener('mouseup', onElementMouseUp);
    element.addEventListener('load', onDOMChanges);
    window.addEventListener('resize', onDOMChanges);
  }

  function usibscribeFromEvents() {
    element.removeEventListener('wheel', onElementMouseWheel);
    element.removeEventListener('mousedown', onElementMouseDown);
    element.removeEventListener('mouseup', onElementMouseUp);
    element.removeEventListener('load', onDOMChanges);
    window.removeEventListener('resize', onDOMChanges);
 
    if (isDragging) {
      unsubscribeFromDraggingEvents();
    }
  }

  function onElementMouseWheel(e) {
    const { elementXPart: xPart, elementYPart: yPart } =
      getEventAxisPositionOnDiv(element, e);
    const { elementXPart: containerXPart, elementYPart: containerYPart } =
      getEventAxisPositionOnDiv(containerElement, e);

    const containerWidth = containerElement.clientWidth;
    const containerHeight = containerElement.clientHeight;

    if (e.deltaY < 0) {
      currentZoomLevel += zoomStep;
    } else {
      currentZoomLevel -= zoomStep;
    }

    currentWidth = containerWidth * currentZoomLevel;
    currentHeight = containerHeight * currentZoomLevel;

    currentTop = - (currentHeight * yPart - containerHeight * containerYPart);
    currentLeft = - (currentWidth * xPart - containerWidth * containerXPart);

    if (currentWidth <= containerWidth || currentHeight <= containerHeight) {
      resetCurrentPosition();
    }

    setCurrentPosition();
  }

  function getEventAxisPositionOnDiv(element, e) {
    const elementWidth = element.clientWidth;
    const elementHeight = element.clientHeight;

    var elementRect = element.getBoundingClientRect();
    var elementX = e.clientX - elementRect.left;
    var elementY = e.clientY - elementRect.top;

    const elementXPart = elementX / elementWidth;
    const elementYPart = elementY / elementHeight;

    return { elementXPart, elementYPart };
  }

  function onElementMouseDown(e) {
    e.preventDefault();

    previousMouseMoveEvent = e;
    isDragging = true;
    subscribeToDraggingEvents();
  }

  function onElementMouseUp(e) {
    e.preventDefault();

    isDragging = false;
    unsubscribeFromDraggingEvents();
  }
  
  function onDOMChanges() {
    resetCurrentPosition();
    setCurrentPosition();
  }

  function subscribeToDraggingEvents() {
    element.addEventListener('mousemove', onElementMouseMove);
    containerElement.addEventListener('mouseout', onElementMouseUp);
  }

  function unsubscribeFromDraggingEvents() {
    element.removeEventListener('mousemove', onElementMouseMove);
    containerElement.removeEventListener('mouseout', onElementMouseUp);
  }

  function onElementMouseMove(e) {
    e.preventDefault();

    currentTop += e.pageY - previousMouseMoveEvent.pageY;
    currentLeft += e.pageX - previousMouseMoveEvent.pageX;

    previousMouseMoveEvent = e;

    setCurrentPosition();
  }

  function setCurrentPosition() {
    setPositionInsideContainer();

    element.style.top = `${currentTop}px`;
    element.style.left = `${currentLeft}px`;

    element.style.width = `${currentWidth}px`;
    element.style.height = `${currentHeight}px`;
  }

  function setPositionInsideContainer() {
    const valueInBorders =
      (value, min, max) => Math.min(Math.max(value, min), max);

    currentTop = valueInBorders(currentTop,
      containerElement.clientHeight - currentHeight, 0);
    currentLeft = valueInBorders(currentLeft,
      containerElement.clientWidth - currentWidth, 0);
  }

  function resetCurrentPosition() {
    currentZoomLevel = 1;
    currentWidth = containerElement.clientWidth;
    currentHeight = containerElement.clientHeight;
    currentTop = 0;
    currentLeft = 0;
  }

  function reset() {
    throwIfDisposed();

    resetCurrentPosition();
    setCurrentPosition();
  }

  function setSrc(src) {
    throwIfDisposed();

    element.src = src;
    backgroundElement.src = src;
  }

  function setSrcAndReset(src) {
    setSrc(src);
    reset();
  }

  function dispose() {
    throwIfDisposed();

    isDisposed = true;
    usibscribeFromEvents();
    containerElement.remove();
  }

  function throwIfDisposed() {
    if (isDisposed) {
      throw new Error('Mouse Wheel Zoom been disposed');
    }
  }

  return {
    reset,
    setSrc,
    setSrcAndReset,
    dispose
  }
}

export {
  mouseWheelZoom
}
