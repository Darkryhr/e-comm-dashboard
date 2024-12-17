import prismadb from '@/lib/prismadb';

interface DashboardPageProps {
  params: { shopId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const shop = await prismadb.shop.findFirst({
    where: {
      id: params.shopId,
    },
  });

  return (
    <>
      <div>Active Store:{shop?.name}</div>
    </>
  );
};

export default DashboardPage;
