import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { shopId: string } }
) {
  try {
    const { userId } = await auth();
    const { label, imageUrl } = await req.json();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });
    if (!label) return new NextResponse('Label is required', { status: 400 });
    if (!imageUrl)
      return new NextResponse('Image URL is required', { status: 400 });
    if (!params.shopId)
      return new NextResponse('Store id is required', { status: 400 });

    const shopByUserId = await prismadb.shop.findFirst({
      where: {
        id: params.shopId,
        userId,
      },
    });

    if (!shopByUserId) return new NextResponse('Unauthorized', { status: 403 });

    const billboard = await prismadb.billBoard.create({
      data: {
        label,
        imageUrl,
        shopId: params.shopId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARDS_POST]: ' + error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { shopId: string } }
) {
  try {
    if (!params.shopId)
      return new NextResponse('Store id is required', { status: 400 });

    const billboards = await prismadb.billBoard.findMany({
      where: {
        shopId: params.shopId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log('[BILLBOARDS_GET]: ' + error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
