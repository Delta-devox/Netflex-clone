import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export async function GET(req: NextRequest) {
  try {
    await serverAuth(); 
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);
    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovies[0]);
  } catch (error) {
    console.error('[RANDOM_MOVIE_GET]', error);
    return new NextResponse('Something went wrong', { status: 400 });
  }
}
