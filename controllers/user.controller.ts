import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import User from "../models/user.model";

// @desc    Get current user's profile
// @route   GET /api/users/me
export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    // req.user is attached by the 'protect' middleware
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
