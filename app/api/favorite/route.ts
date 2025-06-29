import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export async function POST(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth();
    const body = await req.json();
    const { movieId } = body;

    const existingMovie = await prismadb.movie.findUnique({
      where: { id: movieId },
    });

    if (!existingMovie) {
      return new NextResponse("Invalid Movie ID", { status: 404 });
    }

    const user = await prismadb.user.update({
      where: { email: currentUser.email },
      data: {
        favouriteIds: {
          push: movieId, // ✅ let Prisma handle conversion
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('[POST_ERROR]', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
