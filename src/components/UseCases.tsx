
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Building2, Server, Briefcase } from 'lucide-react';

const UseCases = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (cardsRef.current) observer.observe(cardsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="use-cases" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-secondary/50 clip-path-slant opacity-0"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Solutions for <span className="text-primary">Every Team</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Whether you're a startup, enterprise team, or DevOps group, Syncx.app has a pre-configured stack that fits your needs.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-0"
          style={{animationDelay: '200ms'}}
        >
          <div className="bg-white dark:bg-syncx-dark/60 rounded-2xl p-8 shadow-md border border-border transition-all hover:shadow-lg hover:translate-y-[-5px]">
            <div className="bg-syncx-blue/10 rounded-full p-4 w-fit mb-6">
              <Building2 className="h-8 w-8 text-syncx-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Startups</h3>
            <p className="text-foreground/70 mb-4">
              Deploy Supabase + Refine.dev + Checkmate in minutes. Perfect for MVPs and rapid iteration.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-syncx-blue mr-2"></span>
                <span className="text-sm">Database & Auth</span>
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-syncx-blue mr-2"></span>
                <span className="text-sm">Admin Dashboards</span>
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-syncx-blue mr-2"></span>
                <span className="text-sm">Task Management</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-syncx-dark/60 rounded-2xl p-8 shadow-md border border-border transition-all hover:shadow-lg hover:translate-y-[-5px]">
            <div className="bg-syncx-purple/10 rounded-full p-4 w-fit mb-6">
              <Briefcase className="h-8 w-8 text-syncx-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Teams</h3>
            <p className="text-foreground/70 mb-4">
              Replace Slack + Confluence + Gmail with Matrix + Docmost + Stalwart. Own your communication.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-syncx-purple mr-2"></span>
                <span className="text-sm">Secure Messaging</span>
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-syncx-purple mr-2"></span>
                <span className="text-sm">Knowledge Management</span>
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-syncx-purple mr-2"></span>
                <span className="text-sm">Email System</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-syncx-dark/60 rounded-2xl p-8 shadow-md border border-border transition-all hover:shadow-lg hover:translate-y-[-5px]">
            <div className="bg-syncx-indigo/10 rounded-full p-4 w-fit mb-6">
              <Server className="h-8 w-8 text-syncx-indigo" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Enterprise</h3>
            <p className="text-foreground/70 mb-4">
              Complete stacks with SSO, audit logs, and compliance features built-in. Enterprise-ready.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-syncx-indigo mr-2"></span>
                <span className="text-sm">Single Sign-On</span>
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-syncx-indigo mr-2"></span>
                <span className="text-sm">Access Control</span>
              </li>
              <li className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-syncx-indigo mr-2"></span>
                <span className="text-sm">Compliance Tools</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
