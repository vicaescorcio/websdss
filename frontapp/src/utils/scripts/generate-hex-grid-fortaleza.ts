const { polygonToCells, cellToBoundary } = require('h3-js');
const fs = require('fs');

function run() {
  const polygon = [
    [-3.679618, -38.464783],
    [-3.730144, -38.45686],
    [-3.792613, -38.424522],
    [-3.822952, -38.456755],
    [-3.828744, -38.489289],
    [-3.8292, -38.523823],
    [-3.772887, -38.599274],
    [-3.710264, -38.567265],
    [-3.728039, -38.501904],
    [-3.685435, -38.47396],
  ];

  const hexagons = polygonToCells(polygon, 9);

  const featureCollectionHexagons: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [],
  };

  const coordinatesHexagons = hexagons.map((hexagon: any) => {
    const coords = cellToBoundary(hexagon, true);
    return {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [coords] as GeoJSON.Position[][],
      },
    } as GeoJSON.Feature;
  });

  featureCollectionHexagons.features = coordinatesHexagons;

  const data = JSON.stringify(featureCollectionHexagons);

  fs.writeFile('fortaleza-hexgrid.json', data, (error: any) => {
    if (error) {
      console.error(error);
      throw error;
    }
    console.log('fortaleza-hexgrid.json written correctly');
  });
}
run();
