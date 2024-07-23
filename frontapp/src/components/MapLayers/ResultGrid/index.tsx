import { GeoJSON } from 'react-leaflet/GeoJSON';
import { useMapEvents } from 'react-leaflet/hooks';
import L, { Layer, Map, icon } from 'leaflet';
import { AnalysisResult } from '@/app/api/accessibility/types';

const POINTS_COLOR = ['red', 'blue', 'green', 'yellow'];

const ResultGrid = ({
  data,
  results,
  mainHex,
  mainGroup,
}: {
  data: GeoJSON.FeatureCollection;
  results: AnalysisResult;
  mainHex: string | undefined;
  mainGroup: string | undefined;
}) => {
  const getIcon = (color: string) => {
    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };
  const map = useMapEvents({});
  const { rankedResults } = results || {};
  const hexPoints = rankedResults.map((r) => r[0]);

  const colorMap = hexPoints.reduce(
    (acc, hex, index) => {
      acc[hex] = POINTS_COLOR[index];
      return acc;
    },
    {} as Record<string, string>
  );
  const onEachFeature = (feature: any, layer: Layer) => {
    let popupContent = `District Code: ${feature.properties.name} <br> District:`;
    if (feature.properties && feature.properties.popupContent) {
      popupContent += feature.properties.popupContent;
    }

    if (hexPoints.includes(feature.properties.h3_polyfill)) {
      const point = feature.geometry.coordinates[0][0];
      const marker = L.marker([point[1], point[0]], {
        icon: getIcon(colorMap[feature.properties.h3_polyfill]),
      }).bindPopup(`Point of interest ${feature.properties?.id as string}`);
      map.addLayer(marker);
    }
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
      style={(feature) => {
        const featureHex = results.rankedResults.find((r) =>
          Object.values(r[1]).find((v) =>
            v.hex.includes(feature?.properties.h3_polyfill)
          )
        );

        const featureGroups = featureHex
          ? Object.keys(featureHex[1])
              .map((k) => {
                if (
                  featureHex &&
                  featureHex[1][k].hex.includes(feature?.properties.h3_polyfill)
                ) {
                  return k;
                }
              })
              .filter(Boolean)
          : [];

        let fillColor = 'grey';

        if (featureHex) {
          if (mainHex && featureHex[0] !== mainHex) {
            fillColor = 'grey';
          } else {
            fillColor = colorMap[featureHex[0]];
          }
        }
        if (mainGroup && !featureGroups.includes(mainGroup)) {
          fillColor = 'grey';
        }

        return {
          color: colorMap[feature?.properties.h3_polyfill],
          weight: 0.5,
          fillColor: fillColor,
          fillOpacity: 0.5,
        };
      }}
      onEachFeature={onEachFeature}
    />
  );
};

export default ResultGrid;
