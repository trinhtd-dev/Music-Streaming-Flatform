import { Application } from "express";
import homeRouter from "./home.route";

export const routeIndex = (app : Application) => {
    app.use("/", homeRouter);
};