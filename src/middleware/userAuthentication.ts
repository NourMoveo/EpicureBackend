import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret", (err: any, decoded: any) => {
    if (err) {
      console.log("Token verification error:", err);
      return res.sendStatus(401);
    }
    
    (req as any).user = decoded; 
    
    res.cookie('token', token, {
      httpOnly: true,
    });

    next();
  });
};

export const isAdminLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  if (user && user.role === 'admin') {
      return next();
  }
  return res.status(403).json({ error: 'Unauthorized' });
};
