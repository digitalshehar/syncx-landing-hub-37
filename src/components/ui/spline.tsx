
'use client'

import { Suspense, lazy, useState } from 'react'
import { ErrorBoundary } from './error-boundary'
import { Skeleton } from './skeleton'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  fallback?: React.ReactNode
}

export function SplineScene({ scene, className, fallback }: SplineSceneProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleSplineLoad = () => {
    setIsLoading(false);
  };

  const handleSplineError = () => {
    setHasError(true);
    setIsLoading(false);
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

  const loadingFallback = (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-32 w-32 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );

  const actualFallback = fallback || defaultFallback;

  return (
    <ErrorBoundary fallback={actualFallback}>
      <div className="relative w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 z-10">
            {loadingFallback}
          </div>
        )}
        <div className={`w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
          <Suspense fallback={loadingFallback}>
            <Spline
              scene={scene}
              className={className}
              onLoad={handleSplineLoad}
              onError={handleSplineError}
            />
          </Suspense>
        </div>
        {hasError && (
          <div className="absolute inset-0 z-20">
            {actualFallback}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
