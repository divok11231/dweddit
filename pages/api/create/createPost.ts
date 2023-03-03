import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Post } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });
import { verifyToken } from "components/verification";
const jwt = require("jsonwebtoken");
import cookies from "cookie";

interface Error {
  message: string;
}

export default async function handler(req: NextApiRequest, res) {
  try {
    const jwt = req;

    const decoded = verifyToken(jwt, res);

    if (!decoded) {
      return;
    }

    const post = await prisma.post.create({
      data: {
        postPic: req.body.image.imagePublicId,
        content: req.body.content.post,
        author: {
          connect: {
            id: decoded.id,
          },
        },
      },
    });

    res.status(201).json(post);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json();
  }
}
