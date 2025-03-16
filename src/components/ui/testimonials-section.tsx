
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <section className={cn(
      "bg-background text-foreground relative overflow-hidden",
      "py-12 sm:py-24 md:py-32 w-full",
      className
    )}>
      {/* Neural network background pattern */}
      <div className="absolute inset-0 neural-bg opacity-30 z-0"></div>
      
      {/* Animated glowing particles */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-futuristic-blue/70 blur-sm animate-pulse-glow z-0"></div>
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-futuristic-purple/70 blur-sm animate-pulse-glow z-0" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-2/3 right-1/3 w-2 h-2 rounded-full bg-futuristic-neon/70 blur-sm animate-pulse-glow z-0" style={{ animationDelay: '2s' }}></div>
      
      <motion.div 
        className="mx-auto flex max-w-[1600px] w-full flex-col items-center gap-4 text-center sm:gap-16 relative z-10 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.div className="flex flex-col items-center gap-4 px-4 sm:gap-8" variants={itemVariants}>
          <h2 className="max-w-[900px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-futuristic-silver font-mono">
            {title}
          </h2>
          <p className="text-md max-w-[700px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </motion.div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1.5rem] [gap:var(--gap)] flex-row [--duration:40s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}
