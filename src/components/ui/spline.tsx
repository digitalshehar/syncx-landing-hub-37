
'use client'

import { Suspense, lazy, useState } from 'react'
import { ErrorBoundary } from './error-boundary'
import { Skeleton } from './skeleton'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  fallback?: React.ReactNode
  onSceneLoaded?: () => void
}

export function SplineScene({ scene, className, fallback, onSceneLoaded }: SplineSceneProps) {
  const [hasError, setHasError] = useState(false);

  const handleSplineLoad = () => {
    if (onSceneLoaded) onSceneLoaded();
  };

  const handleSplineError = () => {
    setHasError(true);
  };

  const defaultFallback = (
    <div className="w-full h-full flex items-center justify-center backdrop-blur-lg bg-black/10 rounded-lg p-4">
      <div className="space-y-2 text-center">
        <div className="h-24 w-24 mx-auto">
          <div className="w-full h-full rounded-full border-2 border-t-futuristic-neon border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
      </div>
    </div>
  );

  const actualFallback = fallback || defaultFallback;

  return (
    <ErrorBoundary fallback={actualFallback}>
      <div className="relative w-full h-full">
        <Suspense fallback={actualFallback}>
          <Spline
            scene={scene}
            className={className}
            onLoad={handleSplineLoad}
            onError={handleSplineError}
          />
        </Suspense>
        {hasError && (
          <div className="absolute inset-0 z-20">
            {actualFallback}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
