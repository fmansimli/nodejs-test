import type { RequestHandler } from "express";
import { Worker, isMainThread, parentPort, workerData } from "worker_threads";

const performTask = (lengthOfLoop: number): number => {
  for (let i = 0; i < lengthOfLoop; i++) {
    console.log("worker => ", i);
  }
  return lengthOfLoop * 2;
};

const handleWithWorkerThread: RequestHandler = async (req, res, next) => {
  try {
    const lengthOfLoop = 8000000;
    if (isMainThread) {
      const worker = new Worker(__filename, {
        workerData: lengthOfLoop
      });

      worker.on("message", (result) => {
        return res.status(200).json({ result });
      });

      worker.on("error", (error) => {
        return res
          .status(500)
          .json({ error, message: "internal server (in worker) error." });
      });

      worker.on("exit", (code) => {
        if (code !== 0) {
          console.error(`Worker stopped with exit code ${code}`);
        }
      });
    } else {
      const result = performTask(workerData);
      parentPort?.postMessage(result);

      // Terminate the worker thread
      process.exit(0);
    }
  } catch (error) {
    next(error);
  }
};

export default handleWithWorkerThread;
