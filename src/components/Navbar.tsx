
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled 
          ? 'backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-white/10' 
          : 'bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <a 
            href="/" 
            className="text-2xl font-bold font-mono flex items-center"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-futuristic-blue to-futuristic-purple mr-1">Syncx</span>
            <span className="text-foreground/70">.app</span>
            <div className="ml-1.5 relative">
              <div className="w-1.5 h-1.5 bg-futuristic-neon rounded-full animate-pulse-glow"></div>
            </div>
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium text-foreground/80 hover:text-futuristic-blue transition-colors relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-futuristic-blue to-futuristic-purple group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#use-cases" className="text-sm font-medium text-foreground/80 hover:text-futuristic-purple transition-colors relative group">
            Use Cases
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-futuristic-purple to-futuristic-pink group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#waitlist" className="text-sm font-medium text-foreground/80 hover:text-futuristic-neon transition-colors relative group">
            Join Waitlist
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-futuristic-glow to-futuristic-neon group-hover:w-full transition-all duration-300"></span>
          </a>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleTheme}
            className="ml-4 focus:ring-0 border-white/10 dark:border-white/10 hover:border-futuristic-blue/50 dark:hover:border-futuristic-blue/50 transition-colors relative group"
            aria-label="Toggle theme"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-futuristic-blue/5 to-futuristic-purple/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
          
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-futuristic-blue to-futuristic-purple rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-200 group-hover:duration-200"></div>
            <Button size="sm" variant="outline" className="relative border-white/10 dark:border-white/10 dark:text-white font-mono">
              Log In
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleTheme}
            className="focus:ring-0 border-white/10 dark:border-white/10"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu with upgraded design */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 dark:bg-black/95 bg-white/95 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-futuristic-blue/5 to-futuristic-purple/5 z-0"></div>
          
          {/* Neural network background pattern */}
          <div className="absolute inset-0 neural-bg opacity-10"></div>
          
          {/* Animated glowing particles */}
          <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-futuristic-blue/70 blur-sm animate-pulse-glow"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-futuristic-purple/70 blur-sm animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-2/3 right-1/3 w-2 h-2 rounded-full bg-futuristic-neon/70 blur-sm animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
          
          <div className="flex flex-col items-center justify-center h-full space-y-8 p-4 relative z-10">
            <a 
              href="#features" 
              className="text-lg font-medium text-foreground hover:text-futuristic-blue transition-colors flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Sparkles className="h-4 w-4 mr-2 text-futuristic-blue" />
              Features
            </a>
            <a 
              href="#use-cases" 
              className="text-lg font-medium text-foreground hover:text-futuristic-purple transition-colors flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Sparkles className="h-4 w-4 mr-2 text-futuristic-purple" />
              Use Cases
            </a>
            <a 
              href="#waitlist" 
              className="text-lg font-medium text-foreground hover:text-futuristic-neon transition-colors flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Sparkles className="h-4 w-4 mr-2 text-futuristic-neon" />
              Join Waitlist
            </a>
            
            <div className="relative w-full max-w-xs mt-4 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-futuristic-blue to-futuristic-purple rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Button size="lg" variant="outline" className="relative mt-4 w-full border-white/10 dark:border-white/10 dark:text-white font-mono">
                Log In
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
