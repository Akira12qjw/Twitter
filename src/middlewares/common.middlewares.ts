import { NextFunction, Request, Response } from "express";
import { pick } from "lodash";

type fillterKeys<T> = Array<keyof T>;

export const fillterMiddleware =
  <T>(fillterKeys: fillterKeys<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.body = pick(req.body, fillterKeys);
    next();
  };
