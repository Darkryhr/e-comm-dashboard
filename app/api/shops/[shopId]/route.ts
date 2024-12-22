import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { shopId: string } }
) {
  try {
    const { userId } = await auth();
    const { name } = await req.json();

    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    if (!name) return new NextResponse('Name in required', { status: 400 });

    if (!params.shopId)
      return new NextResponse('shop ID is required', { status: 400 });

    const shop = await prismadb.shop.updateMany({
      where: {
        id: params.shopId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(shop);
  } catch (error) {
    console.log('[SHOP_PATCH]: ' + error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { shopId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    if (!params.shopId)
      return new NextResponse('shop ID is required', { status: 400 });

    const shop = await prismadb.shop.deleteMany({
      where: {
        id: params.shopId,
        userId,
      },
    });

    return NextResponse.json(shop);
  } catch (error) {
    console.log('[SHOP_DELETE]: ' + error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
