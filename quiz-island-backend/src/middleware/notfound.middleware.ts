import { Response, Request } from 'express';

const pageNotFoundMiddleware = (request: Request, response: Response): void => {
  response.status(404).json({ message: 'Page Not Found' });
};

export default pageNotFoundMiddleware