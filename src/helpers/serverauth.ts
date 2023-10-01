import { prisma } from "@/helpers/prismadb";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/option";

const serverauth = async () => {
  const session = await getServerSession(options);
  if (!session?.user?.email) {
    throw new Error();
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error();
  }

  return { currentUser };
};

export default serverauth;
