import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { shopId: string; billboardId: string } }
) {
  try {
    const { userId } = await auth();
    const { label, imageUrl } = await req.json();

    if (!userId) return new NextResponse('Unauthorized', { status: 401 });
    if (!label) return new NextResponse('Label is required', { status: 400 });
    if (!imageUrl)
      return new NextResponse('Image URL is required', { status: 400 });

    if (!params.billboardId)
      return new NextResponse('Billboard ID is required', { status: 400 });

    const shopByUserId = await prismadb.shop.findFirst({
      where: {
        id: params.shopId,
        userId,
      },
    });

    if (!shopByUserId) return new NextResponse('Unauthorized', { status: 403 });

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]: ' + error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { shopId: string; billboardId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    if (!params.billboardId)
      return new NextResponse('Billboard ID is required', { status: 400 });

    const shopByUserId = await prismadb.shop.findFirst({
      where: {
        id: params.shopId,
        userId,
      },
    });

    if (!shopByUserId) return new NextResponse('Unauthorized', { status: 403 });

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_DELETE]: ' + error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { shopId: string; billboardId: string } }
) {
  try {
    if (!params.billboardId)
      return new NextResponse('Billboard ID is required', { status: 400 });

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_GET]: ' + error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
