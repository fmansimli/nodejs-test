import type { RequestHandler } from "express";

import fs from "fs/promises";
import path from "path";

export const downloadFile: RequestHandler = async (req, res, next) => {
  const filename = req.query.filename;

  if (!filename) {
    return res.status(400).send("filename should be specified");
  }

  try {
    const filePath = path.resolve(process.cwd(), `src/files/${filename}`);
    const myFile = await fs.readFile(filePath);

    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Type", "application/pdf"); // application/octet-stream

    //res.setHeader("Content-Length", myFile.length);
    //res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    res.status(200).send(myFile);
    //res.status(200).sendFile(filePath);
  } catch (error) {
    next(error);
  }
};
