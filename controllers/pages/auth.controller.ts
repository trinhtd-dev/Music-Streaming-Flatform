import { Request, Response } from "express";

// [GET] /login
export const renderLoginPage = (req: Request, res: Response) => {
  res.render("pages/auth/login", {
    title: "Log In",
  });
};

// [GET] /register
export const renderRegisterPage = (req: Request, res: Response) => {
  res.render("pages/auth/register", {
    title: "Sign Up",
  });
};

// [GET] /logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("authToken");
  res.redirect("/login");
};
