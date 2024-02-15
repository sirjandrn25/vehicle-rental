import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import ModuleRouter from "./modules/root.route";
import CustomError from "./utils/customError.utils";
const bodyParser = require("body-parser");
const cors = require("cors");
const white_list = ["http://localhost:3000"];
dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 8000;
const cor_options = {
  origin: (origin: string, callback: any = () => {}) => {
    if (white_list.includes(origin) || !origin) {
      callback(null, true);
    } else {
      // callback(new Error("Not Allowed by cors"));
    }
  },
};
app.use(bodyParser.json());
app.use(cors(cor_options));

const mongoose = require("mongoose");

db().catch((err) => console.log(err));

async function db() {
  await mongoose.connect("mongodb://127.0.0.1:27017/vehicle-rental");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/api", ModuleRouter);

//handling errors
app.use("*", (req: Request, res: Response, next: Function) => {
  const error: any = new CustomError("not found !!", 404);

  next(error);
});
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
