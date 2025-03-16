
'use client'

import { Suspense, lazy, useState, useEffect, forwardRef } from 'react'
import { ErrorBoundary } from './error-boundary'
import { Skeleton } from './skeleton'
import { Loader2 } from 'lucide-react'

// Use dynamic import with a smaller initial chunk
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  fallback?: React.ReactNode
  onSceneLoaded?: () => void
}

export const SplineScene = forwardRef<HTMLDivElement, SplineSceneProps>(
  function SplineScene({ scene, className, fallback, onSceneLoaded }: SplineSceneProps, ref) {
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [loadTimeout, setLoadTimeout] = useState(false);
    const maxRetries = 1; // Reduced retries for faster fallback

    useEffect(() => {
      // Reset states when scene URL changes
      setHasError(false);
      setIsLoaded(false);
      setLoadTimeout(false);
      
      // Set a timeout to show fallback UI if loading takes too long
      const timeoutId = setTimeout(() => {
        if (!isLoaded) {
          console.log("Spline load timeout - continuing with fallback");
          setLoadTimeout(true);
          if (onSceneLoaded) onSceneLoaded(); // Trigger onSceneLoaded to continue app flow
        }
      }, 4000); // Reduced timeout to 4 seconds
      
      return () => clearTimeout(timeoutId);
    }, [scene, isLoaded, onSceneLoaded]);

    const handleSplineLoad = () => {
      console.log("Spline loaded successfully");
      setIsLoaded(true);
      setHasError(false);
      if (onSceneLoaded) onSceneLoaded();
    };

    const handleSplineError = (err: any) => {
      console.error("Spline error:", err);
      setHasError(true);
      
      // Call onSceneLoaded even on error to prevent blocking the app flow
      if (onSceneLoaded && !isLoaded) onSceneLoaded();
      
      // Auto-retry loading if under max retries
      if (retryCount < maxRetries) {
        const timer = setTimeout(() => {
          console.log(`Retrying Spline load (${retryCount + 1}/${maxRetries})...`);
          setRetryCount(prev => prev + 1);
          setHasError(false); // Reset error to trigger reload
        }, 1500); // Reduced retry delay
        
        return () => clearTimeout(timer);
      }
    };

    const handleRetry = () => {
      setHasError(false);
      setRetryCount(0);
    };

    // Show fallback UI during loading or if there's an error
    const shouldShowFallback = !isLoaded || hasError || loadTimeout;

    const defaultFallback = (
      <div className="w-full h-full flex items-center justify-center">
        <div className="space-y-6 text-center">
          <div className="relative h-24 w-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-futuristic-blue/20 animate-ping-slow"></div>
            <div className="absolute inset-0 rounded-full border-t-4 border-r-4 border-b-4 border-l-4 border-t-futuristic-purple border-r-futuristic-blue border-b-futuristic-neon border-l-transparent animate-spin" style={{ animationDuration: '1.5s' }}></div>
            <div className="absolute inset-[25%] rounded-full border-2 border-t-futuristic-neon border-r-transparent border-b-transparent border-l-futuristic-blue animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
          </div>
          <p className="text-white/80 font-mono animate-pulse">
            {loadTimeout ? "Optimizing visual experience..." : "Initializing 3D Environment..."}
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
        <div className="relative w-full h-full overflow-hidden" ref={ref}>
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
          {shouldShowFallback && (
            <div className="absolute inset-0" style={{ pointerEvents: 'none', zIndex: 5 }}>
              {actualFallback}
            </div>
          )}
        </div>
      </ErrorBoundary>
    );
  }
);
