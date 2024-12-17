import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) redirect('/sign-in');

  const shop = await prismadb.shop.findFirst({
    where: {
      userId,
    },
  });

  if (shop) redirect(`/${shop.id}`);

  return <>{children}</>;
}
