import { NextRequest, NextResponse } from "next/server";
import serverauth from "@/helpers/serverauth";
import { prisma } from "@/helpers/prismadb";

export async function POST(request: NextRequest) {
  try {
    await serverauth();

    const reqBodyText = await request.text();
    const reqBody = { movieId: reqBodyText };

    const { movieId } = reqBody;

    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      return NextResponse.json({ error: "Invalid ID" });
    }

    return NextResponse.json(movie);
  } catch (error: any) {
    return NextResponse.json({ status: 400, error: error.message });
  }
}
