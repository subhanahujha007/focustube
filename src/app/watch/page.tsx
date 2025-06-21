import { Suspense } from 'react';
import WatchPage from '../_Components/WatchPage';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <WatchPage />
    </Suspense>
  );
}
