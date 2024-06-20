import { useMapEvents } from 'react-leaflet';
import { GeoJSON } from 'react-leaflet/GeoJSON';

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

const HexGrid = ({ data }: { data: GeoJSON.FeatureCollection }) => {
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return (
    <GeoJSON
      key={JSON.stringify(data)}
      data={data}
      onEachFeature={onEachFeature}
    />
  );
};

export default HexGrid;
