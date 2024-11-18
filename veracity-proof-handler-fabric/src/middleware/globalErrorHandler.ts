// globalErrorHandler.ts
import { Request, Response, NextFunction } from "express";
import { NotFoundError, BadRequestError, ForbiddenError, UnauthorizedError } from "../utils/errors";

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
    case err instanceof UnauthorizedError:
      res.status(401);
      break;
    case err instanceof ForbiddenError:
      res.status(403);
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
