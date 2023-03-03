import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Post, User } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });
import { verifyToken } from "components/verification";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  const { page = 1 } = req.query;

  const decoded = verifyToken(req, res);
  // console.log(decoded);
  if (!decoded) {
    return;
  }
  // console.log(decoded);

  const display = await prisma.post.findMany({
    skip: (+page - 1) * 3,
    take: 3,
    where: {
      author: {
        followers: {
          some: {
            followerId: decoded.id,
          },
        },
      },
    },
  });
  console.log(display);
  res.status(200).json(display);
}
