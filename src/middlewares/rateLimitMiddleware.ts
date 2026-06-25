import { Request, Response, NextFunction } from 'express';
import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import redisClient from '../config/redis.js';

const windowMs = parseInt(process.env.GLOBAL_RATE_LIMIT_WINDOW_MS || '900000', 10);
const max = parseInt(process.env.GLOBAL_RATE_LIMIT_MAX || '100', 10);

export const globalRateLimiter = rateLimit({
  windowMs,
  max,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req: Request) => (req as any).skipRateLimit === true,
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.sendCommand(args),
  }),
  message: {
    success: false,
    message: "Too many requests, please try again later."
  }
});

export const bypassRateLimit = (req: Request, res: Response, next: NextFunction) => {
  (req as any).skipRateLimit = true;
  next();
};
