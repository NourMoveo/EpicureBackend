import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User, { UserI } from "../models/user";

// Middleware to authenticate user and issue JWT token
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user: UserI | null = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = user.generateToken();

    // Attach token to response headers
    res.setHeader("Authorization", `Bearer ${token}`);

    next();
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Middleware to verify JWT token
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided" });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET || "your-secret-key", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // Attach user ID to request object for further use
      (req as any).userId = (decoded as any).userId;
      next();
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
