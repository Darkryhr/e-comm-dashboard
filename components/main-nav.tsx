'use client';

import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import Link from 'next/link';

function MainNav({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.shopId}`,
      label: 'Overview',
      active: pathname === `/${params.shopId}`,
    },
    {
      href: `/${params.shopId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.shopId}/settings`,
    },
    {
      href: `/${params.shopId}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.shopId}/billboards`,
    },
  ];
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map(route => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

export default MainNav;
