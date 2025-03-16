
import {
  Activity,
  Component,
  HomeIcon,
  Mail,
  Package,
  ScrollText,
  Zap,
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const data = [
  {
    title: 'Home',
    icon: <HomeIcon className='h-full w-full text-white' />,
    href: '#',
  },
  {
    title: 'Products',
    icon: <Package className='h-full w-full text-white' />,
    href: '#',
  },
  {
    title: 'Components',
    icon: <Component className='h-full w-full text-white' />,
    href: '#',
  },
  {
    title: 'Activity',
    icon: <Activity className='h-full w-full text-white' />,
    href: '#',
  },
  {
    title: 'Docs',
    icon: <ScrollText className='h-full w-full text-white' />,
    href: '#',
  },
  {
    title: 'Contact',
    icon: <Mail className='h-full w-full text-white' />,
    href: '#waitlist',
  },
  {
    title: 'Features',
    icon: <Zap className='h-full w-full text-white' />,
    href: '#',
  },
];

export function AppDock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const iconRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // Reset refs array with correct length
    iconRefs.current = iconRefs.current.slice(0, data.length);
    
    // Ensure the array has the right number of elements
    while (iconRefs.current.length < data.length) {
      iconRefs.current.push(null);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dockRef.current) return;
    
    const dockRect = dockRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    
    // Find which icon is closest to the mouse
    let closestIndex = -1;
    let closestDistance = Number.MAX_VALUE;
    
    iconRefs.current.forEach((ref, index) => {
      if (!ref) return;
      
      const iconRect = ref.getBoundingClientRect();
      const iconCenter = iconRect.left + iconRect.width / 2;
      const distance = Math.abs(mouseX - iconCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    setHoverIndex(closestIndex);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <div className='fixed bottom-4 left-1/2 max-w-full -translate-x-1/2 z-50'>
      <div 
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex gap-4 p-2 backdrop-blur-xl bg-black/20 rounded-full border border-white/10"
      >
        {data.map((item, idx) => {
          const isActive = hoverIndex === idx;
          const isAdjacent = Math.abs((hoverIndex || 0) - idx) === 1;
          
          return (
            <a 
              href={item.href} 
              key={idx} 
              className="relative group"
              aria-label={item.title}
            >
              <div className="absolute -top-8 scale-0 group-hover:scale-100 transition-transform origin-bottom duration-200">
                <div className="px-2 py-1 text-xs text-white bg-black/70 rounded-md backdrop-blur-md whitespace-nowrap">
                  {item.title}
                </div>
              </div>
              <div 
                ref={el => iconRefs.current[idx] = el}
                className={cn(
                  "p-2 aspect-square rounded-full backdrop-blur-xl bg-futuristic-blue/20 border border-white/10 hover:bg-futuristic-purple/20 transition-all duration-300 flex items-center justify-center",
                  isActive ? "w-14 h-14 scale-110" : 
                  isAdjacent ? "w-12 h-12 scale-105" : 
                  "w-10 h-10"
                )}
              >
                {item.icon}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
