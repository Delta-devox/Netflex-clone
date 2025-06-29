// app/api/movies/[movieId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import serverAuth from '@/lib/serverAuth';
import prismadb from '@/lib/prismadb';

export async function GET(
  req: NextRequest,
  context: { params: { movieId: string } }
) {
  // 1) Await the dynamic params object before using it
  const { movieId } = await context.params;

  // 2) Basic validation
  if (!movieId || typeof movieId !== 'string') {
    return new NextResponse('Invalid movie ID', { status: 400 });
  }

  try {
    // 3) Authenticate the user (throws if not signed in)
    await serverAuth(req);

    // 4) Fetch the movie from your database
    const movie = await prismadb.movie.findUnique({
      where: { id: movieId },
    });

    // 5) If not found, return 404
    if (!movie) {
      return new NextResponse('Movie not found', { status: 404 });
    }

    // 6) Otherwise return the movie as JSON
    return NextResponse.json(movie);
  } catch (error) {
    console.error('[MOVIE_GET_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
