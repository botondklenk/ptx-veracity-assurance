// globalErrorHandler.ts
import { Request, Response, NextFunction } from "express";
import { NotFoundError, BadRequestError } from "../utils/errors";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  switch (true) {
    case err instanceof NotFoundError:
      res.status(404);
      break;
    case err instanceof BadRequestError:
      res.status(400);
      break;
    default:
      res.status(500);
      break;
  }

  res.json({ error: err.message });
};

export default globalErrorHandler;
