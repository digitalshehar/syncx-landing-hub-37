
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Check } from 'lucide-react';
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
    <section id="waitlist" className="py-20 md:py-32 relative">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-syncx-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-syncx-purple/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={containerRef}
          className="max-w-4xl mx-auto waitlist-card bg-white dark:bg-syncx-dark/60 rounded-2xl p-8 md:p-12 shadow-lg border border-border opacity-0"
        >
          <div className="text-center mb-10">
            <div className="inline-block bg-primary/10 rounded-full px-4 py-1 mb-4">
              <span className="text-sm font-medium text-primary">Limited Time Offer</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Early Access & 50% Off
            </h2>
            <p className="text-lg text-foreground/70">
              Join our waitlist to be among the first to try Syncx.app and receive a 50% discount for your first year.
            </p>
          </div>
          
          {isSuccessful ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
              <p className="text-foreground/70 mb-6">
                We'll notify you as soon as early access is available. In the meantime, spread the word!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline">
                  Share on Twitter
                </Button>
                <Button variant="outline">
                  Share on LinkedIn
                </Button>
              </div>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="use-case">Primary Use Case</Label>
                  <Select
                    value={useCase}
                    onValueChange={setUseCase}
                  >
                    <SelectTrigger id="use-case" className="h-12">
                      <SelectValue placeholder="Select your use case" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className={cn(
                    "w-full md:w-auto group transition-all",
                    isSubmitting && "opacity-90"
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
              
              <div className="text-center text-sm text-foreground/60">
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
