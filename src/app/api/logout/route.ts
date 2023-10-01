import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout success",
      success: true,
    });

    response.cookies.set("next-auth.csrf-token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    response.cookies.set("next-auth.callback-url", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    response.cookies.set("next-auth.session-token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
