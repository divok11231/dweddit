import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(400).json({ message: "Request must be a POST request" });
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

    res.status(201).json({ id: user.id, username: user.email, token: token });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json();
  }
}
