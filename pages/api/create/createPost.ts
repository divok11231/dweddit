import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Post } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });
import { verifyToken } from "components/verification";
const jwt = require("jsonwebtoken");

interface Error {
  message: string;
}

export default async function handler(req, res) {
  try {
    const decoded = verifyToken(req, res);
    if (!decoded) {
      return;
    }

    const { content } = req.body;

    const post = await prisma.post.create({
      data: {
        content: content,
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
