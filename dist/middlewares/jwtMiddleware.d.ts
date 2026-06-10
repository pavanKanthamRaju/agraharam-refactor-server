import { Request, Response, NextFunction } from "express";
declare const verifyToken: (req: Request, res: Response, next: NextFunction) => Response | void;
export default verifyToken;
//# sourceMappingURL=jwtMiddleware.d.ts.map