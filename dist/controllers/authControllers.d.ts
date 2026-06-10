import { Request, Response } from 'express';
declare const signUp: (req: Request, res: Response) => Promise<void>;
declare const login: (req: Request, res: Response) => Promise<void>;
declare const googleLogin: (req: Request, res: Response) => Promise<void>;
export { signUp, login, googleLogin };
//# sourceMappingURL=authControllers.d.ts.map