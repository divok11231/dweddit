import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Post, User } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });
import { verifyToken } from "components/verification";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  try {
    const decoded = verifyToken(req, res);
    if (!decoded) {
      console.log(decoded);
      return;
    }

    const { user } = req.body;

    const updatedUser = await prisma.follows.create({
      data: {
        following: { connect: { id: user } },
        follower: {
          connect: {
            id: decoded.id,
          },
        },
      },
    });

    res.status(201).json(updatedUser);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json();
  }
}
