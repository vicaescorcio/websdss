'use client';
import AnalysisForm from '@/components/Forms/AnalysisForm';
import { AnalysisForm as AnalysisFormType } from '@/components/Forms/AnalysisForm/types';

import dynamic from 'next/dynamic';
import { useMemo, useRef, useState } from 'react';
import style from './page.module.css';
import {
  LocationForm,
  LocationPoint,
} from '@/components/Forms/AnalysisForm/LocationsForm/types';
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

  const HexGrid = useMemo(
    () =>
      dynamic(() => import('@/components/MapLayers/HexGrid'), {
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
          setLocationFormData={setLocationFormData}
          analysisFormData={analysisFormData}
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
