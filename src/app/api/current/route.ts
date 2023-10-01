import serverauth from "@/helpers/serverauth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { currentUser } = await serverauth();

    return NextResponse.json(currentUser);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ status: 400, error: error.message });
  }
}
