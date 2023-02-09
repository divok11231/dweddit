
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Post } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query"] });

interface Error {
    message: string
}

export default async function api(req: NextApiRequest, res: NextApiResponse<Post | Error>) {
    try {
        const { id } = req.body;
        const Post = await prisma.post.delete({ where: { id: id } })
        res.status(201).json(Post)
    } catch (e) {
        res.status(500)
        res.json({ message: "F in chat" });

    }
}