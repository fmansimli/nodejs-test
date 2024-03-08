import type { RequestHandler } from "express";
import fs from "fs/promises";
import fsOld from "fs";
import axios from "axios";
import path from "path";

type AsyncSpliter = (
  array: number[],
  index: number,
  chunkSize: number,
  callback: () => void
) => void;

const processArrayAsync: AsyncSpliter = (array, index, chunkSize, callback) => {
  const endIndex = Math.min(index + chunkSize, array.length);

  for (let i = index; i < endIndex; i++) {
    console.log("async=> ", i);
  }

  if (endIndex < array.length) {
    setImmediate(() => processArrayAsync(array, endIndex, chunkSize, callback));
  } else {
    callback();
  }
};

export const splitToChunks: RequestHandler = async (req, res, next) => {
  try {
    const largeArray = new Array(10000000).fill(5);
    const chunkSize = 1000;

    processArrayAsync(largeArray, 0, chunkSize, () => {
      res.status(200).json({ message: "large array got processed!" });
    });
  } catch (error) {
    next(error);
  }
};

export const estimateTime: RequestHandler = async (req, res, next) => {
  try {
    const largeArray = new Array(10000000).fill(5);

    const startDate = Date.now();
    console.time("request");

    const length = largeArray.length;
    for (let i = 0; i < length; i++) {
      console.log(i, " -> ", largeArray[i]);
    }

    console.timeEnd("request");
    const endDate = Date.now();

    res.status(200).json({
      message: "looped over 10 000 000 length of array",
      milliseconds: new Date(endDate - startDate).getTime(),
      startDate,
      endDate
    });
  } catch (error) {
    next(error);
  }
};

export const sequence: RequestHandler = async (req, res, next) => {
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
  fsOld.readFile(filePath, "utf-8", (err: any, data: string) => {
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

export const sequence2: RequestHandler = async (req, res, next) => {
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
