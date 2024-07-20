'use client';
import AnalysisForm from '@/components/Forms/AnalysisForm';
import { AnalysisForm as AnalysisFormType } from '@/components/Forms/AnalysisForm/types';

import dynamic from 'next/dynamic';
import { useMemo, useRef, useState } from 'react';
import {
  LocationForm,
  LocationPoint,
} from '@/components/Forms/AnalysisForm/LocationsForm/types';
import { Alert, Container, LinearProgress } from '@mui/material';
import { AccessibilityPayload } from './api/accessibility/route';

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
    weight: 0.25,
    incomeRange: [0, 100000],
    ageRange: [0, 10],
    criteriaType: 'max',
    ageLevel: '6_a_10_anos',
  },
};

export default function Page() {
  const analysisFormData = useRef<AnalysisFormType>(initialAnalysisForm);
  const [cityGeoJson, setCityGeoJson] =
    useState<GeoJSON.FeatureCollection | null>(null);

  const [locationFormData, setLocationFormData] = useState<LocationForm>(
    analysisFormData.current.locationForm
  );

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setSubmitting(true);

    const accessibilityAnalysisParams: AccessibilityPayload = {
      pointsOfInterest: locationFormData.points.map(
        (point: LocationPoint) => point.hexId
      ),
      groupCriteria: analysisFormData.current.multiCriteriaForm.groups,
      accessibilityOptions: {
        travelTime: analysisFormData.current.accessibilityForm.travelTime,
        transportMode: analysisFormData.current.accessibilityForm.transportMode,
        accessibilityModel: analysisFormData.current.accessibilityForm.model,
      },
    };
    const response = await fetch('/api/accessibility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accessibilityAnalysisParams),
    });
    setSubmitting(false);
    return {};
  };

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Map/'), {
        loading: () => (
          <Container>
            <LinearProgress />
          </Container>
        ),
        ssr: false,
      }),
    []
  );

  const HexGrid = useMemo(
    () =>
      dynamic(() => import('@/components/MapLayers/HexGrid'), {
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
        handleSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
}
