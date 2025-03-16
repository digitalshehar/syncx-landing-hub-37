
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Shield, Zap, Code, Globe, ArrowRight, Github, Linkedin, Twitter, Users } from 'lucide-react';

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  
  useEffect(() => {
    // Get the current visitor count from localStorage or initialize it
    const getVisitorCount = () => {
      const storedCount = localStorage.getItem('visitorCount');
      return storedCount ? parseInt(storedCount) : 0;
    };
    
    // Increment visitor count on page load
    const incrementVisitorCount = () => {
      const currentCount = getVisitorCount();
      const newCount = currentCount + 1;
      localStorage.setItem('visitorCount', newCount.toString());
      setVisitorCount(newCount);
    };
    
    // Only increment if this is a new session
    if (!sessionStorage.getItem('counted')) {
      incrementVisitorCount();
      sessionStorage.setItem('counted', 'true');
    } else {
      // Just display the current count without incrementing
      setVisitorCount(getVisitorCount());
    }
  }, []);

  return (
    <footer className="relative overflow-hidden py-12 md:py-16">
      {/* Glassmorphism container */}
      <div className="absolute inset-0 backdrop-blur-xl bg-black/30 border-t border-white/10 z-0"></div>
      
      {/* Glow effects */}
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-futuristic-blue/10 rounded-full blur-[100px] animate-pulse-glow"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-futuristic-purple/10 rounded-full blur-[100px] animate-pulse-glow" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand column */}
          <div className="col-span-1 md:col-span-4">
            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-white via-white/80 to-white/70 bg-clip-text text-transparent mb-4 inline-flex items-center">
              Syncx<span className="ml-1 text-futuristic-neon">.app</span>
            </a>
            
            <div className="mt-6 backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white/80 text-sm leading-relaxed">
                Deploy your open-source stack in minutes, fully managed with no DevOps hassle.
              </p>
              <div className="flex items-center mt-4 text-sm">
                <Shield className="h-4 w-4 text-futuristic-neon mr-2" />
                <span className="text-white/70">Proudly GDPR-compliant</span>
              </div>
            </div>
            
            <div className="mt-6">
              <a 
                href="#waitlist" 
                className="inline-flex items-center text-white hover:text-futuristic-neon transition-colors"
              >
                <span>Join waitlist</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </a>
            </div>
          </div>
          
          {/* Links columns */}
          <div className="col-span-1 md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium mb-4 text-white flex items-center">
                  <Code className="h-4 w-4 mr-2 text-futuristic-blue" />
                  Open-Source Partners
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-white/70 hover:text-futuristic-neon transition-colors">Supabase</a></li>
                  <li><a href="#" className="text-white/70 hover:text-futuristic-neon transition-colors">Checkmate</a></li>
                  <li><a href="#" className="text-white/70 hover:text-futuristic-neon transition-colors">Docmost</a></li>
                  <li><a href="#" className="text-white/70 hover:text-futuristic-neon transition-colors">Stalwart</a></li>
                  <li><a href="#" className="text-white/70 hover:text-futuristic-neon transition-colors">Refine.dev</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4 text-white flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-futuristic-purple" />
                  Company
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-white/70 hover:text-futuristic-neon transition-colors">About</a></li>
                  <li><a href="#" className="text-white/70 hover:text-futuristic-neon transition-colors">Blog</a></li>
                  <li><a href="#" className="text-white/70 hover:text-futuristic-neon transition-colors">Careers</a></li>
                  <li><a href="#" className="text-white/70 hover:text-futuristic-neon transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4 text-white flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-futuristic-neon" />
                  Legal
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-white/70 hover:text-futuristic-neon transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-white/70 hover:text-futuristic-neon transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-white/70 hover:text-futuristic-neon transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-sm text-white/60">
            <div className="flex items-center mr-4">
              <Users className="h-4 w-4 mr-1.5 text-futuristic-neon" />
              <span className="text-white/80">{visitorCount.toLocaleString()} visitors</span>
            </div>
            <p>© {new Date().getFullYear()} Syncx.app. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="group p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Twitter className="h-4 w-4 text-white/60 group-hover:text-white" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="group p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Github className="h-4 w-4 text-white/60 group-hover:text-white" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="group p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Linkedin className="h-4 w-4 text-white/60 group-hover:text-white" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
