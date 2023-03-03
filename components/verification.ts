import { verify } from "jsonwebtoken";

export function verifyToken(req, res) {
  interface JwtPayload {
    [x: string]: any;
    id: number;
  }

  const jwt = req.cookies.oursitejwt;

  const token = jwt;

  try {
    const decoded = verify(token, process.env.ACCESS_TOKEN_KEY) as JwtPayload;
    return decoded;
  } catch (err) {
    res.status(403).json({ message: "Fuck up hath occured" });
    return;
  }
}
