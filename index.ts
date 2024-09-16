import express from "express";

import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/database";
import { routeIndex } from "./routes/index.route";

dotenv.config();

connectDB();

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

routeIndex(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
