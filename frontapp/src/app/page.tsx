'use client';
import AnalysisForm from '@/components/Forms/AnalysisForm';
import { AnalysisForm as AnalysisFormType } from '@/components/Forms/AnalysisForm/types';
import HexGrid from '@/components/MapLayers/HexGrid';

import dynamic from 'next/dynamic';
import { useMemo, useRef, useState } from 'react';
import style from './page.module.css';
import {
  LocationForm,
  LocationPoint,
} from '@/components/Forms/AnalysisForm/LocationsForm/types';
import L, { Layer, Map } from 'leaflet';
import { HexProperties } from '@/components/MapLayers/HexGrid/types';

const initialAnalysisForm: AnalysisFormType = {
  locationForm: {
    country: '',
    city: '',
    points: [],
  },
  accessibilityForm: {
    distance: 1000,
    transportMode: 'walking',
    year: '2020',
    model: 'passive',
    travelTime: 30,
  },

  multiCriteriaForm: {
    groups: [],
    gender: 'male',
    incomeRange: [0, 100000],
    ageRange: [0, 10],
  },
};

export default function Page() {
  const analysisFormData = useRef<AnalysisFormType>(initialAnalysisForm);
  const [cityGeoJson, setCityGeoJson] =
    useState<GeoJSON.FeatureCollection | null>(null);

  const [locationFormData, setLocationFormData] = useState<LocationForm>(
    analysisFormData.current.locationForm
  );

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Map/'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div>
      <Map posix={[-3.731862, -38.526669]}>
        <HexGrid
          data={cityGeoJson as GeoJSON.FeatureCollection}
          onClick={(
            feature: GeoJSON.Feature<any, HexProperties>,
            layer: Layer,
            map: Map
          ) => {
            const point = feature.geometry.coordinates[0][0];
            const marker = L.marker([point[1], point[0]]).bindPopup(
              `Point of interest ${feature.properties?.id as string}`
            );
            marker.addEventListener('click', (e) => {
              setLocationFormData((previous: LocationForm) => {
                marker.remove();
                const newPoints = previous.points.filter(
                  (el, i) =>
                    el.hexId !=
                    (feature.properties?.id || `${point[0]}-${point[1]}`)
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
                    hexId: feature.properties?.id || `${point[0]}-${point[1]}`,
                    latitude: point[0],
                    longitude: point[1],
                    name: 'point',
                  } as LocationPoint,
                ],
              };

              analysisFormData.current.locationForm = newLocationData;

              return newLocationData;
            });
          }}
        />
      </Map>
      <AnalysisForm
        locationFormData={locationFormData}
        setLocationFormData={setLocationFormData}
        analysisFormData={analysisFormData}
        setCityGeoJson={setCityGeoJson}
      />
    </div>
  );
}
