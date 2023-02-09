import { verify } from "jsonwebtoken";

export function verifyToken(req, res) {
  const {
    headers: { authorization },
  } = req;
  interface JwtPayload {
    [x: string]: any;
    id: number;
  }

  const token = req.headers.authorization?.replace("Bearer ", "");
  console.log(token);

  try {
    const decoded = verify(token, process.env.ACCESS_TOKEN_KEY) as JwtPayload;
    return decoded;
  } catch (err) {
    res.status(403).json({ message: "Fuck up hath occured" });
    return;
  }
}
