
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Check, Sparkles, Rocket, Zap } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { addToWaitlist } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const WaitlistForm = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [email, setEmail] = useState('');
  const [useCase, setUseCase] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !useCase) {
      toast({
        title: "Error",
        description: "Please fill all fields before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // For demo purposes, we'll simulate a successful submission
      // In a real app, you would use the addToWaitlist function
      // const response = await addToWaitlist(email, useCase);
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      const response = { success: true };
      
      if (response.success) {
        setIsSuccessful(true);
        toast({
          title: "Success!",
          description: "You've been added to our waitlist. We'll be in touch soon!",
        });
      } else {
        throw new Error('Failed to join waitlist');
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="waitlist" className="py-20 md:py-32 relative overflow-hidden">
      {/* Enhanced spotlight effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Morphing blob in the background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-gradient-to-br from-futuristic-purple/5 to-futuristic-blue/10 dark:from-futuristic-purple/10 dark:to-futuristic-blue/5 blur-[80px] morph-shape"></div>
        
        {/* Glowing particles */}
        <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-futuristic-neon/50 blur-sm animate-pulse-glow"></div>
        <div className="absolute top-3/4 left-2/3 h-3 w-3 rounded-full bg-futuristic-purple/50 blur-sm animate-pulse-glow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/4 h-2 w-2 rounded-full bg-futuristic-blue/50 blur-sm animate-pulse-glow" style={{animationDelay: '3s'}}></div>
        
        {/* Orbit lines */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] border border-white/3 rounded-full" style={{transform: 'translate(-50%, -50%) rotate(20deg)'}}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={containerRef}
          className="max-w-4xl mx-auto glass dark:bg-black/40 rounded-2xl p-8 md:p-12 border border-white/10 dark:border-white/5 shadow-2xl backdrop-blur-xl opacity-0 dark:card-shine overflow-hidden"
        >
          {/* Abstract decoration */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-futuristic-blue/20 to-futuristic-purple/20 blur-2xl rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-futuristic-purple/20 to-futuristic-pink/20 blur-2xl rounded-full"></div>
          
          <div className="text-center mb-10 relative">
            <div className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-white/5 dark:bg-black/50 backdrop-blur-sm border border-white/10 dark:border-white/5">
              <span className="px-4 py-1 text-sm font-medium text-futuristic-neon font-mono flex items-center">
                <Zap size={14} className="mr-2" />
                Limited Time Offer
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-br dark:from-white dark:via-futuristic-silver dark:to-slate-300 font-mono">
              Get Early Access & <span className="bg-gradient-to-r from-futuristic-blue to-futuristic-purple bg-clip-text text-transparent">50% Off</span>
            </h2>
            
            <p className="text-lg text-foreground/70">
              Join our waitlist to be among the first to try Syncx.app and receive a 50% discount for your first year.
            </p>
          </div>
          
          {isSuccessful ? (
            <div className="text-center py-8 relative">
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vh] h-[30vh] border border-futuristic-neon/10 rounded-full animate-rotate-slow"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vh] h-[20vh] border border-futuristic-purple/10 rounded-full animate-rotate-slow" style={{animationDelay: '2s', animationDirection: 'reverse'}}></div>
              </div>
              
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-futuristic-neon/20 to-futuristic-blue/20 dark:from-futuristic-neon/10 dark:to-futuristic-blue/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10 relative">
                <div className="absolute inset-0 rounded-full bg-futuristic-neon/5 animate-pulse-glow"></div>
                <Check className="h-10 w-10 text-futuristic-neon relative z-10" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2 font-mono bg-gradient-to-r from-futuristic-neon to-futuristic-blue bg-clip-text text-transparent">You're on the list!</h3>
              
              <p className="text-foreground/70 mb-6">
                We'll notify you as soon as early access is available. In the meantime, spread the word!
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" className="border-futuristic-blue/30 hover:border-futuristic-blue/50 transition-colors group">
                  <div className="absolute inset-0 bg-futuristic-blue/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"></div>
                  <span className="relative z-10">Share on Twitter</span>
                </Button>
                <Button variant="outline" className="border-futuristic-purple/30 hover:border-futuristic-purple/50 transition-colors group">
                  <div className="absolute inset-0 bg-futuristic-purple/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"></div>
                  <span className="relative z-10">Share on LinkedIn</span>
                </Button>
              </div>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-mono">Email Address</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 bg-white/5 dark:bg-black/40 border-white/10 dark:border-white/10 focus:border-futuristic-neon/50 transition-colors backdrop-blur-sm pl-10"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40">
                      @
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="use-case" className="text-sm font-mono">Primary Use Case</Label>
                  <Select
                    value={useCase}
                    onValueChange={setUseCase}
                  >
                    <SelectTrigger id="use-case" className="h-12 bg-white/5 dark:bg-black/40 border-white/10 dark:border-white/10 focus:border-futuristic-neon/50 transition-colors backdrop-blur-sm">
                      <SelectValue placeholder="Select your use case" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-white/10 dark:border-white/10">
                      <SelectItem value="startup">Startup</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="pt-4">
                <div className="relative inline-block group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-futuristic-blue to-futuristic-purple rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-200 group-hover:duration-200 animate-pulse-glow"></div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className={cn(
                      "relative w-full md:w-auto transition-all font-mono",
                      "dark:bg-black dark:text-white dark:border dark:border-futuristic-neon/30 dark:hover:border-futuristic-neon",
                      "bg-black text-white hover:bg-black/90",
                      "px-8 py-6 text-lg",
                      isSubmitting && "opacity-90"
                    )}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="text-center text-sm text-foreground/60 flex items-center justify-center">
                <Sparkles className="h-3 w-3 mr-2 text-futuristic-neon/70" />
                We'll never spam. Unsubscribe anytime.
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;
