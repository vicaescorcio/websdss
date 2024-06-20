'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, LatLngTuple } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useRef, useState, Fragment } from 'react';

import { MapProps } from './types';

const defaults = {
  zoom: 10,
};

const data: GeoJSON.Feature = {
  type: 'Feature',
  properties: {
    name: 'Coors Field',
    amenity: 'Baseball Stadium',
    popupContent: 'This is where the Rockies play!',
  },
  geometry: {
    type: 'Point',
    coordinates: [-104.99404, 39.75621],
  },
};

const Map = (Map: MapProps) => {
  const { zoom = defaults.zoom, posix } = Map;
  const [position, setPosition] = useState<LatLngExpression | LatLngTuple>([
    -33, -70,
  ]);

  return (
    <Fragment>
      <MapContainer
        center={posix}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: 'auto' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={position} draggable={false}>
          <Popup>Hey ! I s tudy here</Popup>
        </Marker>
        {Map.children}
      </MapContainer>
    </Fragment>
  );
};
export default Map;
