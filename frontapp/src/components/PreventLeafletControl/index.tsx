import React, { useEffect, useRef } from 'react';
import { DomEvent } from 'leaflet';
import { useMapEvents } from 'react-leaflet';

const PreventLeafletControl = (props: any) => {
  const map = useMapEvents({});
  const controlRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (controlRef.current) {
      DomEvent.addListener(
        controlRef.current as HTMLElement,
        'mouseover',
        () => {
          map.dragging.disable();
          map.doubleClickZoom.disable();
        }
      );
      DomEvent.addListener(
        controlRef.current as HTMLElement,
        'mouseout',
        () => {
          map.dragging.enable();
          map.doubleClickZoom.enable();
        }
      );
    }
  });

  return <div ref={controlRef}>{props.children}</div>;
};

export default PreventLeafletControl;
