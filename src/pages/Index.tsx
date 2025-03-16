
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import UseCases from '@/components/UseCases';
import WaitlistForm from '@/components/WaitlistForm';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { Waves } from '@/components/ui/waves-background';
import { AppDock } from '@/components/AppDock';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    
    // Simulated loading time to ensure all components are ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

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
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-futuristic-blue/20 animate-ping"></div>
                <div className="absolute inset-2 rounded-full border-2 border-t-futuristic-purple border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              </div>
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
              <WaitlistForm />
            </main>
            <Footer />
            <AppDock />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Index;
