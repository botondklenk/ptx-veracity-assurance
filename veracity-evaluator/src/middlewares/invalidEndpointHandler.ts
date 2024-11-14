import { Request, Response, NextFunction } from 'express';

export function invalidEndpointHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ message: 'Invalid endpoint' });
}