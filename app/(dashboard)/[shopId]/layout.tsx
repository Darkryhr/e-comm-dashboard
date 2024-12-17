import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { shopId: string };
}) {
  const { userId } = await auth();

  if (!userId) redirect('/sign-in');

  const shop = await prismadb.shop.findFirst({
    where: {
      id: params.shopId,
      userId,
    },
  });

  if (!shop) redirect('/');

  return (
    <>
      <div>Navbar</div>
      {children}
    </>
  );
}
