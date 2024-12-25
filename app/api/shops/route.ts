import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { name } = await req.json();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });
    if (!name) return new NextResponse('Name is required', { status: 400 });

    const shop = await prismadb.shop.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(shop);
  } catch (error) {
    console.log('[SHOPS_POST]: ' + error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
