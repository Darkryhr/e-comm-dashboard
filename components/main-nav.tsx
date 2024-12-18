'use client';

import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

function MainNav({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.shopId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.shopId}/settings`,
    },
  ];
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
    ></nav>
  );
}

export default MainNav;
