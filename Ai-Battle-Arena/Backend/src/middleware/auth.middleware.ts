import type { NextFunction,Response,Request } from "express"
import jwt from "jsonwebtoken"
import redis from "../config/redisClient.js"


const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token Not Found" });
    }

    // Redis चेक
    const isTokenBlacklisted = await redis.get(token);
    if (isTokenBlacklisted) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    // JWT verify (इसमें secret की स्पेलिंग और env चेक करें)
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
    // @ts-ignore या अपने Request टाइप को extend करें
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authUser