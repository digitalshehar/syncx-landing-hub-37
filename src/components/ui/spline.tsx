
'use client'

import { Suspense, lazy, useState } from 'react'
import { ErrorBoundary } from './error-boundary'
import { Skeleton } from './skeleton'
import { Progress } from './progress'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  fallback?: React.ReactNode
  onSceneLoaded?: () => void
}

export function SplineScene({ scene, className, fallback, onSceneLoaded }: SplineSceneProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Simulate progress during loading
  useState(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadProgress(prev => {
          const next = prev + Math.random() * 15;
          return next > 90 ? 90 : next; // Cap at 90% until actually loaded
        });
      }, 500);
    }
    
    return () => clearInterval(interval);
  });

  const handleSplineLoad = () => {
    setIsLoading(false);
    setLoadProgress(100);
    if (onSceneLoaded) onSceneLoaded();
  };

  const handleSplineError = () => {
    setHasError(true);
    setIsLoading(false);
    setLoadProgress(100);
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
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-6 w-full max-w-md">
        <Skeleton className="h-32 w-32 rounded-full" />
        <div className="space-y-4 w-full">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <div className="w-full space-y-2">
            <Progress value={loadProgress} className="h-1 w-full bg-white/10" />
            <p className="text-xs text-white/50 text-right">{Math.round(loadProgress)}%</p>
          </div>
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
