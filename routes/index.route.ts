import { Application } from "express";

import homeRouter from "./home.route";
import musicRouter from "./music.route";


export const routeIndex = (app : Application) => {
    app.use("/", homeRouter);
    app.use("/music", musicRouter);
};