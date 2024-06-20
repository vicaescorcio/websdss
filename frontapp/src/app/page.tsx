'use client';
import AnalysisForm from '@/components/Forms/AnalysisForm';
import HexGrid from '@/components/MapLayers/HexGrid';

import dynamic from 'next/dynamic';
import { useMemo, useRef, useState } from 'react';
import style from './page.module.css';
import {
  LocationForm,
  LocationPoint,
} from '@/components/Forms/AnalysisForm/LocationsForm/types';
import L, { LatLngTuple, Layer, Map } from 'leaflet';

const initialAnalysisForm: AnalysisForm = {
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
  const analysisFormData = useRef<AnalysisForm>(initialAnalysisForm);
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
          onClick={(feature: any, layer: Layer, map: Map) => {
            const point = [-33, -70] as LatLngTuple;
            const marker = L.marker(point).bindPopup('This is Littleton, CO.');
            map.addLayer(marker);
            setLocationFormData((previous: LocationForm) => {
              if (previous.points.length > 3) return previous;
              const newLocationData = {
                ...previous,
                points: [
                  ...previous.points,
                  {
                    parentHex: 'dddd',
                    latitude: point[0],
                    longitude: point[1],
                    name: 'point 1',
                  } as LocationPoint,
                ],
              };

              analysisFormData.current.locationForm = newLocationData;

              return newLocationData;
            });

            console.log('Feature clicked', feature.geometry.coordinates);
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
