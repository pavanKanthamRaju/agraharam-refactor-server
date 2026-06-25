import { Request, Response, NextFunction } from "express";
import redisClient from "../config/redis.js";

interface BruteForceOptions {
  maxFailures: number;
  windowMs: number;
  lockoutMs: number;
  getIdentifier?: (req: Request) => string | undefined;
}

export const bruteForceLimiter = (options: BruteForceOptions) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // If brute force is bypassed on this request
    if ((req as any).skipBruteForce) {
      return next();
    }

    const ip = req.ip || req.socket.remoteAddress || "unknown_ip";
    const identifier = options.getIdentifier ? options.getIdentifier(req) : undefined;

    const ipLockKey = `bf:lock:ip:${ip}`;
    const idLockKey = identifier ? `bf:lock:id:${identifier}` : undefined;

    try {
      // Check if locked
      const ipLockTtl = await redisClient.ttl(ipLockKey);
      const idLockTtl = idLockKey ? await redisClient.ttl(idLockKey) : -2;

      const maxTtl = Math.max(ipLockTtl > 0 ? ipLockTtl : 0, idLockTtl > 0 ? idLockTtl : 0);

      if (maxTtl > 0) {
        res.setHeader("Retry-After", maxTtl);
        res.status(429).json({
          success: false,
          message: "Too many failed attempts. Please try again later.",
          retryAfter: maxTtl,
        });
        return;
      }

      // Intercept the response to capture success/failure status
      const originalJson = res.json;
      const originalSend = res.send;

      let finished = false;

      const handleResponse = async (statusCode: number) => {
        if (finished || (res as any).bruteForceChecked) return;
        finished = true;
        (res as any).bruteForceChecked = true;

        const isSuccess = statusCode >= 200 && statusCode < 300;
        const ipFailKey = `bf:fail:ip:${ip}`;
        const idFailKey = identifier ? `bf:fail:id:${identifier}` : undefined;

        try {
          if (isSuccess) {
            // Reset failures on success
            await redisClient.del(ipFailKey);
            if (idFailKey) {
              await redisClient.del(idFailKey);
            }
          } else {
            // Increment failures
            const ipFails = await redisClient.incr(ipFailKey);
            if (ipFails === 1) {
              await redisClient.expire(ipFailKey, Math.ceil(options.windowMs / 1000));
            }

            let idFails = 0;
            if (idFailKey) {
              idFails = await redisClient.incr(idFailKey);
              if (idFails === 1) {
                await redisClient.expire(idFailKey, Math.ceil(options.windowMs / 1000));
              }
            }

            // Lockout check
            if (ipFails >= options.maxFailures) {
              await redisClient.setEx(ipLockKey, Math.ceil(options.lockoutMs / 1000), "locked");
              console.warn(`[BruteForce] Locked out IP: ${ip} for ${options.lockoutMs}ms`);
            }
            if (idLockKey && idFails >= options.maxFailures) {
              await redisClient.setEx(idLockKey, Math.ceil(options.lockoutMs / 1000), "locked");
              console.warn(`[BruteForce] Locked out Identifier: ${identifier} for ${options.lockoutMs}ms`);
            }
          }
        } catch (err) {
          console.error("Error in BruteForce handleResponse:", err);
        }
      };

      res.json = function (body: any) {
        handleResponse(res.statusCode);
        return originalJson.call(this, body);
      };

      res.send = function (body: any) {
        handleResponse(res.statusCode);
        return originalSend.call(this, body);
      };

      next();
    } catch (err) {
      console.error("Error in brute force middleware:", err);
      next(err);
    }
  };
};

export const bypassBruteForce = (req: Request, res: Response, next: NextFunction) => {
  (req as any).skipBruteForce = true;
  next();
};
