import type { RequestHandler } from "express";
import fs from "fs/promises";
import path from "path";
import axios from "axios";

const sequence2: RequestHandler = async (req, res, next) => {
  console.log("started...");

  try {
    const resp = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log("users loaded...");

    process.nextTick(() => {
      console.log("nextTick...");
    });

    const filePath = path.join(process.cwd(), "./src/files/sample.txt");
    const fileContent = await fs.readFile(filePath, "utf-8");
    console.log("file loaded...");

    setImmediate(() => {
      console.log("setImmediate ...");
    });

    res.status(200).json({ fileContent, users: resp.data });
  } catch (error) {
    next(error);
  }
};

export default sequence2;
