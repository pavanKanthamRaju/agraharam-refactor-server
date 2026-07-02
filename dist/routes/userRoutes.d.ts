import { z } from "zod";
declare const router: import("express-serve-static-core").Router;
export declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    phone: z.ZodCoercedString<unknown>;
    role: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        user: "user";
        admin: "admin";
        vendor: "vendor";
    }>>>;
}, z.core.$strip>;
export default router;
//# sourceMappingURL=userRoutes.d.ts.map