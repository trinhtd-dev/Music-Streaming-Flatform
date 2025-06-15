import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "./auth.middleware";

export const attachUserToView = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.authToken;
  res.locals.user = null;

  if (token) {
    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (jwtSecret) {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        // Make user info available in all Pug templates
        res.locals.user = {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
          fullName: decoded.fullName,
        };
      }
    } catch (error) {
      // Invalid token, do nothing, user will be null
      res.locals.user = null;
    }
  }
  next();
};
