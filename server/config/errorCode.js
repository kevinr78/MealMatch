const ERROR_CODES = {
  BAD_REQUEST: {
    code: 400,
    message: "Bad Request",
  },
  UNAUTHORIZED: {
    code: 401,
    message: "Unauthorized",
  },
  FORBIDDEN: {
    code: 403,
    message: "Forbidden",
  },
  NOT_FOUND: {
    code: 404,
    message: "Resource not found",
  },
  CONFLICT: {
    code: 409,
    message: "Conflict",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: "Internal Server Error",
  },
};

export default ERROR_CODES;
