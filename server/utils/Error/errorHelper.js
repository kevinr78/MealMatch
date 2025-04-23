import ERROR_CODES from "../../config/errorCode.js";
import AppError from "./AppError.js";

export function throwError(
  type = "Unknown Error Type",
  customMessage = null,
  code = null
) {
  const errorType = ERROR_CODES[type];

  if (!errorType) {
    throw new AppError(type, code ?? 500, customMessage);
  }

  const message = customMessage || errorType.message;
  throw new AppError(message, errorType.code, customMessage);
}

export function globalErrorHandler(err, req, res, next) {
  console.error("💥", err);

  const statusCode = err.statusCode || ERROR_CODES.INTERNAL_SERVER_ERROR.code;
  const message = err.message || ERROR_CODES.INTERNAL_SERVER_ERROR.message;

  res.status(statusCode).json({
    success: false,
    error: {
      statusCode,
      message,
      reason: err.reason || null,
    },
  });
}
