import { Layer } from 'leaflet';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import { useMapEvents } from 'react-leaflet/hooks';

const HexGrid = ({
  data,
  onClick,
}: {
  data: GeoJSON.FeatureCollection;
  onClick: any;
}) => {
  const map = useMapEvents({});
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

  // const map = useMapEvents({
  //   click() {
  //     map.locate();
  //     map.addLayer(marker);
  //   },
  //   locationfound(e) {
  //     map.flyTo(e.latlng, map.getZoom());
  //   },
  // });

  return (
    <GeoJSON
      key={JSON.stringify(data)}
      data={data}
      onEachFeature={onEachFeature}
    />
  );
};

export default HexGrid;
