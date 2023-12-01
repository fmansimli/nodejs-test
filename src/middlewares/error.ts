import { RequestHandler, ErrorRequestHandler } from "express";

export const catch404: RequestHandler = (req, res, _next) => {
  res.status(404).json({
    httpCode: 404,
    message: "route not found!"
  });
};

export const catchError: ErrorRequestHandler = (err, req, res, _next) => {
  console.log(err);

  try {
    res.status(500).json({
      httpCode: 500,
      message: err.message
    });
  } catch (error) {
    res.status(500).json({
      httpCode: 500,
      message: "unknown error",
      cause: error
    });
  }
};
