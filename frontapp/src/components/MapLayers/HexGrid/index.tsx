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
  return <GeoJSON data={data} onEachFeature={onEachFeature} />;
};

export default HexGrid;
