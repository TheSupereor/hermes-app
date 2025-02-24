import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Incoming Request:');
  console.log(`Req of type ${req.method} to route ${req.path}`);
  switch (req.method) {
    case 'GET':
      console.log('[GET] Params: ', JSON.stringify(req.params));
      break;
    default:
      console.log(`[${req.method}] Body: `, req.body);
      break;
  }
  next();
}
