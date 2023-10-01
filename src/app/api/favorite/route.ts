import { NextResponse } from "next/server";
import serverauth from "@/helpers/serverauth";
import { prisma } from "@/helpers/prismadb";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { currentUser } = await serverauth();

    const { movieId } = reqBody;

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      return NextResponse.json({ error: "Invalid ID" });
    }
    const user = await prisma.user.update({
      where: {
        email: currentUser.email as string,
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });
    console.log(movieId);

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ status: 400, error: error.message });
  }
}
export async function DELETE(req: Request) {
  try {
    const reqBody = await req.json();
    const { currentUser } = await serverauth();
    const { movieId } = reqBody;
    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      return NextResponse.json({ error: "Invalid ID" });
    }

    const updatedFavoriteIds = currentUser.favoriteIds.filter(
      (id) => id !== movieId
    );

    const updatedUser = await prisma.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json({ status: 400, error: error.message });
  }
}
