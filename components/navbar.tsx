import { UserButton } from '@clerk/nextjs';

import MainNav from '@/components/main-nav';
import ShopSelector from '@/components/shop-selector';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Navbar = async () => {
  const { userId } = await auth();

  if (!userId) redirect('/sign-in');

  const shops = await prismadb.shop.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <ShopSelector items={shops} />
        <MainNav className='mx-6 ' />
        <div className='ml-auto flex items-center space-x-4'>
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
