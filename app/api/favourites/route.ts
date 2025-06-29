import { NextRequest, NextResponse } from 'next/server';
import serverAuth from '@/lib/serverAuth';
import prismadb from '@/lib/prismadb';

export async function GET(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth();

   
    if (!currentUser.favoriteIds || currentUser.favoriteIds.length === 0) {
      return NextResponse.json([]);
    }

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser.favoriteIds,
        },
      },
    });

    return NextResponse.json(favoriteMovies);
  } catch (error) {
    console.error('[GET_FAVORITES_ERROR]', error);
    return new NextResponse('Failed to fetch favorites', { status: 500 });
  }
}
