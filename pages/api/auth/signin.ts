import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });
import { serialize } from "cookie";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(402).json({ message: "Extremely mid request" });
      res.end();
      return;
    }

    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(404);
      res.end();
      return;
    }

    const oldUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!oldUser) {
      res.status(406);
      res.end();
      return;
    }

    if (await compare(password, oldUser.password)) {
      const token = sign(
        { id: oldUser.id, email: email },
        process.env.ACCESS_TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      const serialised = serialize("oursitejwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      res
        .setHeader("Set-Cookie", serialised)
        .status(200)
        .json({ email: email, token: token, message: "lesssgoooo" });
      return;
    } else {
      res.status(403).json({ message: "use brane dumbass" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error" });
    return;
  }
}
