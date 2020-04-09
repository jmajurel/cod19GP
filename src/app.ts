import express, { Request, Response } from "express";

const app = express();

const PORT = process.env.PORT || 8083;

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log("Cod19GP is listening on Port: " + PORT);
});
