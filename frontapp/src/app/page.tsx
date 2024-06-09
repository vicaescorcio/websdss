import dynamic from 'next/dynamic';
import { useMemo } from 'react';

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
      <Map posix={[-3.731862, -38.526669]} />
    </div>
  );
}
