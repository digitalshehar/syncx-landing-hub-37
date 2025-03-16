
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SplineScene } from '@/components/ui/spline';
import { Spotlight } from '@/components/ui/spotlight';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [showOptimizedFallback, setShowOptimizedFallback] = useState(false);
  const isMobile = useIsMobile();

  const handleSplineLoaded = () => {
    console.log("Spline scene loaded successfully in Hero");
    setSplineLoaded(true);
    // Immediately hide the fallback when Spline is loaded
    setShowOptimizedFallback(false);
  };

  // Only set up the timeout if Spline hasn't loaded yet
  useEffect(() => {
    if (splineLoaded) return;
    
    const timeoutId = setTimeout(() => {
      if (!splineLoaded) {
        setShowOptimizedFallback(true);
      }
    }, 3000); // Show optimized fallback after 3 seconds if not loaded
    
    return () => clearTimeout(timeoutId);
  }, [splineLoaded]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  // Optimized fallback for the 3D component - simplified version
  const heroFallback = (
    <div className="w-full h-full flex items-center justify-center pointer-events-none">
      {!splineLoaded && (
        <div className="relative p-8 text-center max-w-md pointer-events-none">          
          <div className="space-y-4">
            {showOptimizedFallback ? (
              // Simplified, more performance-friendly fallback
              <div className="mx-auto w-full max-w-md">
                <div className="h-40 w-full bg-gradient-to-br from-futuristic-blue/20 to-futuristic-purple/20 rounded-xl mb-4"></div>
                <div className="h-3 w-3/4 mx-auto bg-futuristic-neon/30 rounded-full mb-2"></div>
                <div className="h-3 w-1/2 mx-auto bg-futuristic-blue/30 rounded-full"></div>
              </div>
            ) : (
              <>
                <div className="relative h-16 w-16 mx-auto">
                  <div className="absolute inset-0 rounded-full border-2 border-futuristic-blue/20"></div>
                  <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-b-2 border-l-2 border-t-futuristic-purple border-r-futuristic-blue border-b-futuristic-neon border-l-transparent animate-spin"></div>
                </div>
                
                <p className="text-white/80 font-mono text-sm">
                  Loading visualization...
                </p>
              </>
            )}
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-futuristic-blue/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-futuristic-purple/10 rounded-full blur-xl"></div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Enhanced spotlights with pointer-events-none */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] bg-futuristic-purple/5 blur-[120px] rounded-full animate-pulse-glow"></div>
        <div className="absolute top-1/3 left-1/3 w-[50vw] h-[50vh] bg-futuristic-blue/5 blur-[100px] rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <Spotlight className="spotlight z-5" fill="white" />
      </div>
      
      <div 
        ref={containerRef} 
        className="container max-w-6xl mx-auto px-4 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="text-center lg:text-left space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold tracking-tight text-white font-mono"
            >
              Spin up your <span className="bg-gradient-to-r from-futuristic-purple to-futuristic-blue bg-clip-text text-transparent">open-source</span> stack in{' '}
              <span className="relative inline-block">
                minutes
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-futuristic-neon rounded-full animate-pulse-glow"></span>
              </span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-300 text-balance"
            >
              Configure and deploy multiple tools with a unified dashboard and seamless integration.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="pt-8"
            >
              <motion.a 
                href="#waitlist" 
                className="relative group inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-futuristic-purple to-futuristic-blue rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow"></div>
                <Button 
                  size="lg" 
                  className={cn(
                    "relative",
                    "backdrop-blur-xl bg-black/50 text-white border border-white/10 hover:border-futuristic-neon/50",
                    "px-8 py-6 text-lg",
                    "transition-all duration-500"
                  )}
                >
                  Join Waitlist for Early Access
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.a>
              
              <motion.div 
                variants={fadeInUp}
                className="mt-8 flex justify-center lg:justify-start items-center space-x-2 opacity-70"
              >
                <Zap size={16} className="text-futuristic-neon animate-pulse-subtle" />
                <span className="text-sm text-white">No credit card required • Cancel anytime</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative h-[650px] w-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 20,
              delay: 0.6 
            }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
                className="w-full h-full"
                fallback={heroFallback}
                onSceneLoaded={handleSplineLoaded}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
