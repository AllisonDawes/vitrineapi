import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";

import AppError from "./errors/AppError";
import routes from "./routes";

import "./database";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: "error",
    message: "internal server error",
  });
});

//app.get("/home", (request: Request, response: Response) => {
//  return response.status(200).send("Hello World");
//});

const PORT = 3333;

app.listen(PORT, () => {
  console.log("Server running in port " + PORT);
});
