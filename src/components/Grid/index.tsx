import React, { useEffect } from 'react';

import './index.css';

export function Grid(props: { children: React.ReactNode }) {
  let gridNode: HTMLDivElement | null;

  useEffect(
    () => {
      if (gridNode == null) {
        return;
      }
      observeGrid(gridNode);
    },
    []
  );

  // return <button ref={el => (button = el)} />
  return <div className="grid" data-min="20rem" ref={(el) => (gridNode = el)}>
    {props.children}
  </div>;
}

function observeGrid(gridNode: Element): void {
  // Feature detect ResizeObserver
  if ('ResizeObserver' in window) {
    // Get the min value from data-min="[min]"
    // @ts-ignore
    const min = gridNode.dataset.min;
    // Create a proxy element to measure and convert
    // the `min` value (which might be em, rem, etc) to `px`
    const test = document.createElement('div');
    test.style.width = min;
    gridNode.appendChild(test);
    const minToPixels = test.offsetWidth;
    gridNode.removeChild(test);

    // @ts-ignore
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Get the element's current dimensions
        const cr = entry.contentRect;
        // `true` if the container is wider than the minimum
        const isWide = cr.width > minToPixels;
        // toggle the class conditionally
        gridNode.classList.toggle('aboveMin', isWide);
        console.log('observeGrid', isWide);
      }
    });

    ro.observe(gridNode);
  }
}
