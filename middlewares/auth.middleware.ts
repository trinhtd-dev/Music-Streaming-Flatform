import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend the Request type to include the user payload
export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (format: "Bearer <token>")
      token = req.headers.authorization.split(" ")[1];

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        console.error("FATAL ERROR: JWT_SECRET is not defined.");
        return res.status(500).json({ message: "Internal Server Error" });
      }

      // Verify token
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

      // We expect the token to have id and email
      if (decoded.id && decoded.email) {
        // Attach user payload to the request object
        req.user = { id: decoded.id, email: decoded.email };
        next();
      } else {
        return res
          .status(401)
          .json({ message: "Not authorized, token invalid" });
      }
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
