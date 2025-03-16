
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
}

export function TestimonialCard({ author, text, href }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        "flex flex-col gap-4 rounded-xl p-6 text-left",
        "bg-white/5 dark:bg-black/60 backdrop-blur-md",
        "w-[320px] h-[220px] shrink-0",
        "border border-white/10 dark:border-white/5",
        "hover:border-futuristic-blue/30 dark:hover:border-futuristic-blue/30",
        "transition-colors duration-300"
      )}
    >
      <p className="flex-1 text-muted-foreground">"{text}"</p>
      
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden border border-white/10">
            <img
              src={author.avatar}
              alt={author.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{author.name}</p>
            <p className="text-xs text-muted-foreground">{author.handle}</p>
          </div>
        </div>
        
        {href && (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-futuristic-blue hover:text-futuristic-neon transition-colors"
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
