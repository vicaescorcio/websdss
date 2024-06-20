'use client';
import AnalysisForm from '@/components/Forms/AnalysisForm';
import dynamic from 'next/dynamic';
import { useMemo, useRef } from 'react';
import style from './page.module.css';

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
      <Map posix={[-3.731862, -38.526669]}></Map>
      <AnalysisForm analysisFormData={analysisFormData} />
    </div>
  );
}
