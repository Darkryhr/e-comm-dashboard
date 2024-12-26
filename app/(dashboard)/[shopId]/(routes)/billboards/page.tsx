import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';
import { BillboardClient } from './components/client';
import { BillboardCol } from './components/columns';

const BillboardsPage = async ({ params }: { params: { shopId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      shopId: params.shopId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBillboards: BillboardCol[] = billboards.map(billboard => ({
    id: billboard.id,
    label: billboard.label,
    createdAt: format(billboard.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
