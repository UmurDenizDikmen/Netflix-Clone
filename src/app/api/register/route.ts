import { NextResponse } from "next/server";
import bcryptjs from "bcrypt";
import { prisma } from "@/helpers/prismadb";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();

    const { name, email, password } = reqBody;

    const currentUser = await prisma.user.findUnique({
      where: { email },
    });

    if (currentUser) {
      return NextResponse.json({ error: "Email taken" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    console.log(newUser);

    return NextResponse.json(newUser);
  } catch (error: any) {
    return NextResponse.json({ status: 400, error: error.message });
  }
}
