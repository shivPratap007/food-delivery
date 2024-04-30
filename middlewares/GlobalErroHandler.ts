import { NextFunction } from "express";
import { HttpError } from "http-errors";

// Define the global error handler middleware function
export function GlobalErrorHandler(
  err: HttpError,            // Accepts an HttpError object
  req: Request,              // Request object
  res: Response,             // Response object
  next: NextFunction         // Next function
) {
  // Extract the status code from the error object
  const statusCode = err.status || "500";

  // Set the status code of the response and send a JSON error response
  return res.status(statusCode).json({
    status: statusCode,      // Include the status code in the response
    message: err.message,    // Include the error message in the response
  });
}
