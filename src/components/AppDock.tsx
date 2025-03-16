
import {
  Activity,
  Component,
  HomeIcon,
  Mail,
  Package,
  ScrollText,
  Zap,
} from 'lucide-react';

import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const data = [
  {
    title: 'Home',
    icon: (
      <HomeIcon className='h-full w-full text-white' />
    ),
    href: '#',
  },
  {
    title: 'Products',
    icon: (
      <Package className='h-full w-full text-white' />
    ),
    href: '#',
  },
  {
    title: 'Components',
    icon: (
      <Component className='h-full w-full text-white' />
    ),
    href: '#',
  },
  {
    title: 'Activity',
    icon: (
      <Activity className='h-full w-full text-white' />
    ),
    href: '#',
  },
  {
    title: 'Docs',
    icon: (
      <ScrollText className='h-full w-full text-white' />
    ),
    href: '#',
  },
  {
    title: 'Contact',
    icon: (
      <Mail className='h-full w-full text-white' />
    ),
    href: '#waitlist',
  },
  {
    title: 'Features',
    icon: (
      <Zap className='h-full w-full text-white' />
    ),
    href: '#',
  },
];

export function AppDock() {
  return (
    <div className='fixed bottom-4 left-1/2 max-w-full -translate-x-1/2 z-50'>
      <Dock className='items-end pb-3'>
        {data.map((item, idx) => (
          <DockItem
            key={idx}
            className='aspect-square rounded-full backdrop-blur-xl bg-futuristic-blue/20 border border-white/10 hover:bg-futuristic-purple/20 transition-colors'
          >
            <DockLabel>{item.title}</DockLabel>
            <a href={item.href}>
              <DockIcon>{item.icon}</DockIcon>
            </a>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}
