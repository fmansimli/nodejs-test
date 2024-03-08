import type { RequestHandler } from "express";

const estimateTime: RequestHandler = async (req, res, next) => {
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

export default estimateTime;
