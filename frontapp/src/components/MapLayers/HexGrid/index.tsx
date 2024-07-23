import { GeoJSON } from 'react-leaflet/GeoJSON';
import { useMapEvents } from 'react-leaflet/hooks';
import { HexProperties } from './types';
import {
  LocationForm,
  LocationPoint,
} from '@/components/Forms/AnalysisForm/LocationsForm/types';
import L, { LatLngTuple, Layer, Map } from 'leaflet';

const HexGrid = ({
  data,
  setLocationFormData,
  analysisFormData,
}: {
  data: GeoJSON.FeatureCollection;
  setLocationFormData: any;
  analysisFormData: any;
}) => {
  const map = useMapEvents({});
  const onClick = (
    feature: GeoJSON.Feature<any, HexProperties>,
    layer: Layer,
    map: Map
  ) => {
    const point = feature.geometry.coordinates[0][0];
    const marker = L.marker([point[1], point[0]]).bindPopup(
      `Point of interest ${feature.properties?.id as string}`
    );
    map.flyTo([point[1], point[0]], 12);
    marker.addEventListener('click', (e) => {
      setLocationFormData((previous: LocationForm) => {
        marker.remove();
        const newPoints = previous.points.filter(
          (el, i) =>
            el.hexId !=
            (feature.properties?.h3_polyfill || `${point[0]}-${point[1]}`)
        );
        const newLocationData = { ...previous, points: newPoints };
        analysisFormData.current.locationForm = newLocationData;

        return newLocationData;
      });
    });
    setLocationFormData((previous: LocationForm) => {
      if (previous.points.length > 3) return previous;
      map.addLayer(marker);
      const newLocationData = {
        ...previous,
        points: [
          ...previous.points,
          {
            hexId: feature.properties?.h3_polyfill || `${point[0]}-${point[1]}`,
            latitude: point[0],
            longitude: point[1],
            name: `point ${previous.points.length + 1}`,
          } as LocationPoint,
        ],
      };

      analysisFormData.current.locationForm = newLocationData;

      return newLocationData;
    });
  };

  const onEachFeature = (feature: any, layer: Layer) => {
    let popupContent = `District Code: ${feature.properties.name} <br> District:`;
    if (feature.properties && feature.properties.popupContent) {
      popupContent += feature.properties.popupContent;
    }
    layer.on({
      click: () => {
        onClick(feature, layer, map);
      },
    });
  };

  return (
    <GeoJSON
      key={JSON.stringify(data)}
      data={data}
      onEachFeature={onEachFeature}
    />
  );
};

export default HexGrid;
