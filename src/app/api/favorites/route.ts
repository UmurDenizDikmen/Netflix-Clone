import { NextResponse } from "next/server";
import serverauth from "@/helpers/serverauth";
import { prisma } from "@/helpers/prismadb";

export async function GET() {
  try {
    const { currentUser } = await serverauth();
    const favoriteMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });

    return NextResponse.json(favoriteMovies);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ status: 400, error: error.message });
  }
}
