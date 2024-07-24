'use client';
import AnalysisForm from '@/components/Forms/AnalysisForm';
import { AnalysisForm as AnalysisFormType } from '@/components/Forms/AnalysisForm/types';

import dynamic from 'next/dynamic';
import { useMemo, useRef, useState } from 'react';
import {
  LocationForm,
  LocationPoint,
} from '@/components/Forms/AnalysisForm/LocationsForm/types';
import { Container, LinearProgress } from '@mui/material';
import {
  AccessibilityPayload,
  AnalysisResult,
} from './api/accessibility/types';
import { ResultsFilter } from '@/components/Forms/AnalysisForm/ResultForm/types';
import MapFiltersForm from '@/components/Forms/MapFiltersForm';

const initialAnalysisForm: AnalysisFormType = {
  locationForm: {
    country: '',
    city: '',
    points: [],
  },
  accessibilityForm: {
    distance: 1000,
    transportMode: 'public',
    year: '2023',
    model: 'passive',
    travelTime: 30,
  },

  multiCriteriaForm: {
    groups: [],
    gender: 'male',
    weight: 1,
    incomeRange: [0, 5000],
    criteriaType: 'max',
    ageLevel: ['6_a_10_anos'],
  },
};

export default function Page() {
  const analysisFormData = useRef<AnalysisFormType>({ ...initialAnalysisForm });
  const [cityGeoJson, setCityGeoJson] =
    useState<GeoJSON.FeatureCollection | null>(null);

  const [locationFormData, setLocationFormData] = useState<LocationForm>({
    ...analysisFormData.current.locationForm,
  });

  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [resultsFilter, setResultsFilter] = useState<ResultsFilter | null>(
    null
  );

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

    setResults((await response.json()) as AnalysisResult);

    setSubmitting(false);
    return {};
  };

  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Map/'), {
        loading: () => <LinearProgress />,
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

  const ResultGrid = useMemo(
    () =>
      dynamic(() => import('@/components/MapLayers/ResultGrid'), {
        ssr: false,
      }),
    []
  );

  const PreventLeafletControl = useMemo(
    () =>
      dynamic(() => import('@/components/PreventLeafletControl'), {
        ssr: false,
      }),
    []
  );

  const resetAnalysis = () => {
    window?.location.reload();
  };

  const [centerPoint, setCenterPoint] = useState([-3.731862, -38.526669]);
  return (
    <div>
      <Map posix={centerPoint}>
        {!results ? (
          <HexGrid
            data={cityGeoJson as GeoJSON.FeatureCollection}
            setLocationFormData={setLocationFormData}
            analysisFormData={analysisFormData}
          />
        ) : (
          <ResultGrid
            data={cityGeoJson as GeoJSON.FeatureCollection}
            results={results}
            mainHex={resultsFilter?.hex}
            mainGroup={resultsFilter?.group}
          ></ResultGrid>
        )}
        <PreventLeafletControl>
          <AnalysisForm
            locationFormData={locationFormData}
            setLocationFormData={setLocationFormData}
            analysisFormData={analysisFormData}
            setCityGeoJson={setCityGeoJson}
            handleSubmit={handleSubmit}
            submitting={submitting}
            results={results}
            resultsFilter={resultsFilter}
            setResultsFilter={setResultsFilter}
            resetAnalysis={resetAnalysis}
          />
          {resultsFilter && (
            <MapFiltersForm
              filters={resultsFilter}
              setFilters={setResultsFilter}
            />
          )}
        </PreventLeafletControl>
      </Map>
    </div>
  );
}
