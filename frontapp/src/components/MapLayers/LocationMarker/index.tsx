import { LatLngExpression } from 'leaflet';
import { ReactNode } from 'react';
import { Marker, Popup } from 'react-leaflet';

const LocationMarker = ({
  position,
  popupContent,
}: {
  position: LatLngExpression;
  popupContent: ReactNode;
}) => {
  return (
    <Marker position={position}>
      <Popup>{popupContent}</Popup>
    </Marker>
  );
};

export default LocationMarker;
