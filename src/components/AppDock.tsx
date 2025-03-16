
import {
  Activity,
  Component,
  HomeIcon,
  Mail,
  Package,
  ScrollText,
  Zap,
} from 'lucide-react';

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
  return (
    <div className='fixed bottom-4 left-1/2 max-w-full -translate-x-1/2 z-50'>
      <div className="flex gap-4 p-2 backdrop-blur-xl bg-black/20 rounded-full border border-white/10">
        {data.map((item, idx) => (
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
            <div className="p-2 aspect-square rounded-full backdrop-blur-xl bg-futuristic-blue/20 border border-white/10 hover:bg-futuristic-purple/20 transition-colors duration-200 flex items-center justify-center w-10 h-10">
              {item.icon}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
