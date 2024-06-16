'use client';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import HexGrid from '../MapLayers/HexGrid';
import { LatLngExpression, LatLngTuple } from 'leaflet';
import fortalezaHexagons from '../../../public/fortaleza-hexgrid.json';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useRef } from 'react';

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
  children?: React.ReactNode;
}

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
  const geoJsonLayerRef = useRef(data);
  const { zoom = defaults.zoom, posix } = Map;

  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: 'auto' }}
    >
      <HexGrid data={fortalezaHexagons as GeoJSON.FeatureCollection} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={posix} draggable={false}>
        <Popup>Hey ! I s tudy here</Popup>
      </Marker>
      {Map.children}
    </MapContainer>
  );
};
export default Map;
