import { NextFunction, Request, Response } from 'express';

export interface statusError extends Error {
  status?: number;
}

const errorMiddleware = (error: statusError, request: Request, response: Response, next: NextFunction): void => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).json({ status, message });
};
export default errorMiddleware;