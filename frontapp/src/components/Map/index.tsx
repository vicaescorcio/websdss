'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import { LatLngExpression, LatLngTuple } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useRef } from 'react';
import hexagons from '../../../fortaleza-hexgrid.json';

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
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

const datas: GeoJSON.FeatureCollection = hexagons as GeoJSON.FeatureCollection;

const onEachFeature = (feature: any, layer: any) => {
  let popupContent = `District Code: ${feature.properties.name} <br> District:`;
  if (feature.properties && feature.properties.popupContent) {
    popupContent += feature.properties.popupContent;
  }
  layer.on({
    click: () => {
      console.log('Feature clicked', feature.geometry.coordinates);
    },
  });
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
      <GeoJSON
        key={Math.random() + 2}
        data={datas}
        onEachFeature={onEachFeature}
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={posix} draggable={false}>
        <Popup>Hey ! I study here</Popup>
      </Marker>
    </MapContainer>
  );
};
export default Map;
