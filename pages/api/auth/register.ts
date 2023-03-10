import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });
import { serialize } from "cookie";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res
        .status(400)
        .json({ message: "Request must be a request of all times" });
      return;
    }
    const { email, password } = req.body;

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    const token = sign(
      { id: user.id, email: user.email },
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
      .status(201)
      .json({ id: user.id, username: user.email, token: token });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json();
  }
}
