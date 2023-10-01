import { NextResponse } from "next/server";
import { prisma } from "@/helpers/prismadb";
import serverauth from "@/helpers/serverauth";
export async function GET() {
  try {
    await serverauth();
    const movies = await prisma.movie.findMany();
    return NextResponse.json(movies);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ status: 400, error: error.message });
  }
}
