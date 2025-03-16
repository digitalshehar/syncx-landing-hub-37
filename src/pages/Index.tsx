
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import UseCases from '@/components/UseCases';
import WaitlistForm from '@/components/WaitlistForm';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated loading time to ensure all 3D components are ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <div className="flex flex-col items-center">
            <div className="loader mb-4"></div>
            <p className="text-white/80 font-mono text-sm animate-pulse">Loading 3D Experience...</p>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <main className="flex-grow">
            <Hero />
            <Features />
            <UseCases />
            <WaitlistForm />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
