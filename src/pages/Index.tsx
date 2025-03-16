
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import UseCases from '@/components/UseCases';
import Testimonials from '@/components/Testimonials';
import WaitlistForm from '@/components/WaitlistForm';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { Waves } from '@/components/ui/waves-background';
import { SplineScene } from '@/components/ui/spline';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    
    // Simulate loading progress with faster increments
    const progressInterval = setInterval(() => {
      setLoadProgress(prev => {
        // Increase progress more quickly
        const increment = Math.random() * 15; // Increased from 10 to 15
        // Cap at 95% until Spline is loaded or timeout
        const next = Math.min(prev + increment, (splineLoaded || loadingTimeout) ? 100 : 95);
        return next;
      });
    }, 300); // Reduced from 400ms to 300ms
    
    // If Spline loads or timeout occurs, set progress to 100% and finish loading
    if ((splineLoaded || loadingTimeout) && loadProgress >= 95) {
      clearInterval(progressInterval);
      setLoadProgress(100);
      setTimeout(() => setIsLoading(false), 300); // Reduced from 400ms to 300ms
    }
    
    // Fallback: If taking too long, continue anyway with a shorter timeout
    const fallbackTimer = setTimeout(() => {
      if (!splineLoaded && !loadingTimeout) {
        console.log("Loading timeout - continuing anyway");
        setLoadingTimeout(true);
      }
    }, 5000); // Reduced from 8000ms to 5000ms
    
    return () => {
      clearInterval(progressInterval);
      clearTimeout(fallbackTimer);
    };
  }, [splineLoaded, loadProgress, loadingTimeout]);

  const handleSplineLoaded = () => {
    console.log("Preloaded Spline scene loaded successfully");
    setSplineLoaded(true);
  };

  return (
    <ErrorBoundary fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black p-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
        <p className="text-slate-300 max-w-md mb-8">
          We're having trouble loading your experience. Please refresh the page or try again later.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    }>
      <div className="min-h-screen flex flex-col bg-black">
        {/* Global unified background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Waves 
            lineColor="rgba(255, 255, 255, 0.15)"
            backgroundColor="transparent"
            waveSpeedX={0.015}
            waveSpeedY={0.008}
            waveAmpX={30}
            waveAmpY={15}
            friction={0.92}
            tension={0.008}
            maxCursorMove={80}
            xGap={14}
            yGap={40}
          />
        </div>

        {isLoading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
            <div className="flex flex-col items-center max-w-md w-full px-6">
              {/* Hidden preloader for Spline - positioned to be invisible but still fully load */}
              <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0, overflow: 'hidden' }}>
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  onSceneLoaded={handleSplineLoaded}
                />
              </div>
              
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-futuristic-blue/20 animate-ping"></div>
                <div className="absolute inset-2 rounded-full border-t-2 border-r-2 border-b-2 border-l-2 border-t-futuristic-purple border-r-futuristic-blue border-b-futuristic-neon border-l-transparent animate-spin"></div>
                <div className="absolute inset-4 rounded-full border-2 border-t-futuristic-neon border-r-transparent border-b-transparent border-l-futuristic-blue animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
              </div>
              <h2 className="text-xl font-mono text-white mb-6">Syncx</h2>
              <div className="w-full h-2 rounded-full bg-white/5 mb-2 overflow-hidden relative">
                <div 
                  className="h-full rounded-full absolute top-0 left-0 bg-gradient-to-r from-futuristic-neon via-futuristic-blue to-futuristic-purple background-animate"
                  style={{ 
                    width: `${loadProgress}%`, 
                    transition: 'width 0.3s ease-out', // Faster transition
                    backgroundSize: '200% 100%',
                    animation: 'gradient-x 3s ease infinite'
                  }}
                ></div>
              </div>
              <p className="text-white/60 font-mono text-sm mt-2 self-end">{Math.round(loadProgress)}%</p>
              <p className="text-white/80 font-mono text-sm mt-4 animate-pulse">Loading Experience...</p>
            </div>
          </div>
        ) : (
          <>
            <Navbar />
            <main className="flex-grow relative z-10">
              <Hero />
              <Features />
              <UseCases />
              <Testimonials />
              <WaitlistForm />
            </main>
            <Footer />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Index;
