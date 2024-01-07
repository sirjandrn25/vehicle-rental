const express = require("express");
import type { Request, Response, Application } from "express";
import moduleRouter from "./modules/route";
import dotenv from "dotenv";
import errorHandler from "./controllers/error.handler.controller";
import CustomError from "./utils/customError.utils";
const bodyParser = require("body-parser");
const cors = require("cors");
//For env File
dotenv.config();

const white_list = ["http://localhost:3000"];
const cor_options = {
  origin: (origin: string, callback: any = () => {}) => {
    if (white_list.includes(origin) || !origin) {
      callback(null, true);
    } else {
      // callback(new Error("Not Allowed by cors"));
    }
  },
};

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(cors(cor_options));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});
app.use("/api/", moduleRouter);

app.use("*", (req: Request, res: Response, next: Function) => {
  const error: any = new CustomError("not found !!", 404);

  next(error);
});
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
