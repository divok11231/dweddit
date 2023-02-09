import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(400).json({ message: "Extremely mid request" });
      return;
    }

    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json;
      return;
    }

    const oldUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!oldUser) {
      res.status(400);
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

      res.status(200).json({ email: email, token: token });
      return;
    } else {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json();
  }
}
