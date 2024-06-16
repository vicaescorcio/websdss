import AnalysisForm from '@/components/Forms/AnalysisForm';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import style from './page.module.css';

export default async function Page() {
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
      <AnalysisForm />
    </div>
  );
}
