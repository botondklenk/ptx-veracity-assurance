import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { components, paths } from '../generated/api-types';
import { IncomingHttpHeaders } from 'http';

export type Model<Name extends keyof components['schemas']> = components['schemas'][Name];

export type RequestBody<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = 'requestBody' extends keyof paths[Path][Method]
  ? 'content' extends keyof paths[Path][Method]['requestBody']
  ? 'application/json' extends keyof paths[Path][Method]['requestBody']['content']
  ? paths[Path][Method]['requestBody']['content']['application/json']
  : unknown
  : unknown
  : unknown;

export type ResponseBody<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = 'responses' extends keyof paths[Path][Method]
  ? 200 extends keyof paths[Path][Method]['responses']
  ? 'content' extends keyof paths[Path][Method]['responses'][200]
  ? 'application/json' extends keyof paths[Path][Method]['responses'][200]['content']
  ? paths[Path][Method]['responses'][200]['content']['application/json']
  : unknown
  : unknown
  : unknown
  : unknown;

export type RequestParams<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = 'parameters' extends keyof paths[Path][Method]
  ? 'path' extends keyof paths[Path][Method]['parameters']
  ? paths[Path][Method]['parameters']['path']
  : unknown
  : unknown;

export type RequestQuery<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = 'parameters' extends keyof paths[Path][Method]
  ? 'query' extends keyof paths[Path][Method]['parameters']
  ? paths[Path][Method]['parameters']['query']
  : unknown
  : unknown;

export type RequestHeaders<
  Path extends keyof paths,
  Method extends keyof paths[Path]
> = 'parameters' extends keyof paths[Path][Method]
  ? 'header' extends keyof paths[Path][Method]['parameters']
  ? paths[Path][Method]['parameters']['header']
  : unknown
  : unknown;

export const GET = <
  Path extends keyof paths,
  Method extends keyof paths[Path] = 'get'
>(
  handler: (
    params: RequestParams<Path, Method>,
    query: RequestQuery<Path, Method>,
    headers: IncomingHttpHeaders
  ) => Promise<ResponseBody<Path, Method>> | ResponseBody<Path, Method>
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params: RequestParams<Path, Method> = req.params as any;
      const query: RequestQuery<Path, Method> = req.query as any;

      const data: ResponseBody<Path, Method> = await handler(params, query, req.headers);

      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      next(err);
    }
  };
};

export const POST = <
  Path extends keyof paths,
  Method extends keyof paths[Path] = 'post'
>(
  handler: (
    params: RequestParams<Path, Method>,
    query: RequestQuery<Path, Method>,
    body: RequestBody<Path, Method>,
    headers: IncomingHttpHeaders
  ) => Promise<ResponseBody<Path, Method>> | ResponseBody<Path, Method>
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params: RequestParams<Path, Method> = req.params as any;
      const query: RequestQuery<Path, Method> = req.query as any;
      const body: RequestBody<Path, Method> = req.body as any;

      const data: ResponseBody<Path, Method> = await handler(params, query, body, req.headers);

      res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      next(err);
    }
  };
};

export const PUT = <
  Path extends keyof paths,
  Method extends keyof paths[Path] = 'put'
>(
  handler: (
    params: RequestParams<Path, Method>,
    query: RequestQuery<Path, Method>,
    body: RequestBody<Path, Method>,
    headers: IncomingHttpHeaders
  ) => Promise<ResponseBody<Path, Method>> | ResponseBody<Path, Method>
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params: RequestParams<Path, Method> = req.params as any;
      const query: RequestQuery<Path, Method> = req.query as any;
      const body: RequestBody<Path, Method> = req.body as any;

      const data: ResponseBody<Path, Method> = await handler(params, query, body, req.headers);

      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      next(err);
    }
  };
};

export const PATCH = <
  Path extends keyof paths,
  Method extends keyof paths[Path] = 'patch'
>(
  handler: (
    params: RequestParams<Path, Method>,
    query: RequestQuery<Path, Method>,
    body: RequestBody<Path, Method>,
    headers: IncomingHttpHeaders
  ) => Promise<ResponseBody<Path, Method>> | ResponseBody<Path, Method>
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params: RequestParams<Path, Method> = req.params as any;
      const query: RequestQuery<Path, Method> = req.query as any;
      const body: RequestBody<Path, Method> = req.body as any;

      const data: ResponseBody<Path, Method> = await handler(params, query, body, req.headers);

      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      next(err);
    }
  };
};

export const DELETE = <
  Path extends keyof paths,
  Method extends keyof paths[Path] = 'delete'
>(
  handler: (
    params: RequestParams<Path, Method>,
    query: RequestQuery<Path, Method>,
    headers: IncomingHttpHeaders
  ) => Promise<ResponseBody<Path, Method>> | ResponseBody<Path, Method>
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const params: RequestParams<Path, Method> = req.params as any;
      const query: RequestQuery<Path, Method> = req.query as any;

      const data: ResponseBody<Path, Method> = await handler(params, query, req.headers);

      res.status(HttpStatus.OK).json(data);
    } catch (err) {
      next(err);
    }
  };
};