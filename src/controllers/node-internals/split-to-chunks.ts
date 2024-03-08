import { RequestHandler } from "express";

const splitToChunks: RequestHandler = async (req, res, next) => {
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

export default splitToChunks;

const processArrayAsync: AsyncOp = (array, index, chunkSize, callback) => {
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

type AsyncOp = (
  array: number[],
  index: number,
  chunkSize: number,
  callback: () => void
) => void;
