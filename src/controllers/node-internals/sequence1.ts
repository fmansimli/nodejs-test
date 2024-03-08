import type { RequestHandler } from "express";
import fs from "fs";
import axios from "axios";
import path from "path";

const sequence1: RequestHandler = async (req, res, next) => {
  let fileContent: null | string = null;
  let users: any[] = [];

  console.log("started...");

  setImmediate(() => {
    console.log("setImmediate ...");
  });

  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((resp) => {
      users = resp.data;
      console.log("users loaded...");
    })
    .catch((err) => next(err));

  const filePath = path.join(process.cwd(), "./src/files/sample.txt");
  fs.readFile(filePath, "utf-8", (err: any, data: string) => {
    if (!err) {
      fileContent = data;
      console.log("file loaded...");
    } else {
      return next(err);
    }
  });

  process.nextTick(() => {
    console.log("nextTick...");
  });

  res.status(200).json({ fileContent, users });
};

export default sequence1;
