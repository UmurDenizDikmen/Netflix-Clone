import { NextResponse } from "next/server";
import { prisma } from "@/helpers/prismadb";
import serverauth from "@/helpers/serverauth";

export async function GET() {
  try {
    await serverauth();
    const movieCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);
    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovies[0]);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ status: 400, error: error.message });
  }
}
