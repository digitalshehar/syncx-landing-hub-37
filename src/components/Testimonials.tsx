
import React from 'react';
import { TestimonialsSection } from '@/components/ui/testimonials-section';
import { Sparkles } from 'lucide-react';

const testimonialsData = [
  {
    author: {
      name: "Alex Chen",
      handle: "@alexdevops",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Syncx has completely transformed our development workflow. We've been able to run all our essential tools in one place, saving hours of setup time.",
    href: "https://twitter.com/alexdevops"
  },
  {
    author: {
      name: "Sarah Johnson",
      handle: "@sarahtech",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "The unified dashboard makes it so easy to monitor all our open-source tools. No more jumping between tabs and interfaces!",
    href: "https://twitter.com/sarahtech"
  },
  {
    author: {
      name: "Miguel Rodriguez",
      handle: "@migueldev",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Deploying Matrix + Docmost together took less than 5 minutes. Syncx has become our team's secret productivity weapon.",
  },
  {
    author: {
      name: "Aisha Patel",
      handle: "@aishacloud",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "We switched from a mix of SaaS tools to Syncx's open-source stack and cut our monthly costs by 70%. The seamless integration is the cherry on top.",
    href: "https://twitter.com/aishacloud"
  },
  {
    author: {
      name: "David Kim",
      handle: "@davidops",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "Having full control of our data while still getting the convenience of a managed service is exactly what we needed. Syncx delivered perfectly.",
  }
];

const Testimonials = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] bg-futuristic-purple/5 blur-[120px] rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <span className="px-4 py-1 text-sm font-medium text-futuristic-neon flex items-center font-mono">
              <Sparkles size={14} className="mr-2" />
              What Our Users Say
            </span>
          </div>
        </div>
        
        <TestimonialsSection
          title="Loved by teams worldwide"
          description="Join thousands of developers who are already deploying their open-source stacks with Syncx"
          testimonials={testimonialsData}
        />
      </div>
    </div>
  );
};

export default Testimonials;
