
'use client'

import { Suspense, lazy, useState, useEffect } from 'react'
import { ErrorBoundary } from './error-boundary'
import { Skeleton } from './skeleton'
import { Loader2 } from 'lucide-react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  fallback?: React.ReactNode
  onSceneLoaded?: () => void
}

export function SplineScene({ scene, className, fallback, onSceneLoaded }: SplineSceneProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  useEffect(() => {
    // Reset error state when scene URL changes
    setHasError(false);
    setIsLoaded(false);
  }, [scene]);

  const handleSplineLoad = () => {
    console.log("Spline loaded successfully");
    setIsLoaded(true);
    setHasError(false);
    if (onSceneLoaded) onSceneLoaded();
  };

  const handleSplineError = (err: any) => {
    console.error("Spline error:", err);
    setHasError(true);
    
    // Auto-retry loading if under max retries
    if (retryCount < maxRetries) {
      const timer = setTimeout(() => {
        console.log(`Retrying Spline load (${retryCount + 1}/${maxRetries})...`);
        setRetryCount(prev => prev + 1);
        setHasError(false); // Reset error to trigger reload
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setRetryCount(0);
  };

  const defaultFallback = (
    <div className="w-full h-full flex items-center justify-center backdrop-blur-lg bg-black/30 rounded-lg p-6">
      <div className="space-y-6 text-center">
        <div className="relative h-24 w-24 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-futuristic-blue/20 animate-ping-slow"></div>
          <div className="absolute inset-0 rounded-full border-t-4 border-r-4 border-b-4 border-l-4 border-t-futuristic-purple border-r-futuristic-blue border-b-futuristic-neon border-l-transparent animate-spin" style={{ animationDuration: '1.5s' }}></div>
          <div className="absolute inset-[25%] rounded-full border-2 border-t-futuristic-neon border-r-transparent border-b-transparent border-l-futuristic-blue animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
        </div>
        <p className="text-white/80 font-mono animate-pulse">
          {hasError ? "Loading 3D Experience..." : "Initializing 3D Environment..."}
        </p>
        {hasError && retryCount >= maxRetries && (
          <button 
            onClick={handleRetry}
            className="px-4 py-2 bg-futuristic-blue/20 hover:bg-futuristic-blue/30 text-white rounded-md mt-4 transition-colors"
          >
            Retry Loading
          </button>
        )}
      </div>
    </div>
  );

  const actualFallback = fallback || defaultFallback;

  return (
    <ErrorBoundary fallback={actualFallback}>
      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <Suspense fallback={actualFallback}>
          {!hasError && (
            <Spline
              scene={scene}
              className={className}
              onLoad={handleSplineLoad}
              onError={handleSplineError}
            />
          )}
        </Suspense>
        {!isLoaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            {actualFallback}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
