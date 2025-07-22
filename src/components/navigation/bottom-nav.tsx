'use client';

import { Home, Compass, User, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/discover', icon: Compass, label: 'Discover' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 p-4">
      <div className="soft-neumorphism flex justify-around items-center h-20 max-w-md mx-auto p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full text-muted-foreground transition-all duration-300 ease-in-out rounded-lg',
                 isActive ? 'text-primary' : 'hover:text-primary'
              )}
            >
              <div className={cn("p-3 transition-all duration-300", isActive && "soft-neumorphism-inset")}>
                <item.icon
                  className="w-7 h-7"
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
