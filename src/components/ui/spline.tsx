
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
          <svg viewBox="0 0 24 24" className="h-full w-full text-slate-400 animate-pulse">
            <path
              fill="currentColor"
              d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198c.03-.028.061-.056.091-.086L12 5.432z"
            />
          </svg>
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
