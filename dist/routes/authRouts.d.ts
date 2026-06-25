import { z } from "zod";
declare const router: import("express-serve-static-core").Router;
export declare const loginSchema: z.ZodObject<{
    identifier: z.ZodCoercedString<unknown>;
    password: z.ZodCoercedString<unknown>;
}, z.core.$strip>;
export declare const signupSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodCoercedString<unknown>;
    role: z.ZodEnum<{
        user: "user";
        admin: "admin";
        vendor: "vendor";
    }>;
    password: z.ZodString;
}, z.core.$strip>;
export declare const googleLoginSchema: z.ZodObject<{
    userInfo: z.ZodObject<{
        email: z.ZodString;
        name: z.ZodString;
        picture: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        sub: z.ZodCoercedString<unknown>;
    }, z.core.$strip>;
}, z.core.$strip>;
export default router;
//# sourceMappingURL=authRouts.d.ts.map