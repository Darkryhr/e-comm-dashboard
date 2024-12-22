import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import SettingsForm from './components/settings-form';

interface SettingsPageProps {
  params: {
    shopId: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = await auth();

  // TODO: create a middleware to remove this repeating code
  if (!userId) redirect('/sign-in');

  const shop = await prismadb.shop.findFirst({
    where: {
      id: params.shopId,
      userId,
    },
  });

  if (!shop) redirect('/');

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={shop} />
      </div>
    </div>
  );
};

export default SettingsPage;
