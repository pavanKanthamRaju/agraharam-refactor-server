import { z } from "zod";
declare const router: import("express-serve-static-core").Router;
export declare const addNivedyamSchema: z.ZodObject<{
    nivedyam_name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    category_id: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    price: z.ZodCoercedNumber<unknown>;
    unit: z.ZodOptional<z.ZodString>;
    image_url: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const updateNivedyamSchema: z.ZodObject<{
    nivedyam_name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    category_id: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    price: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    unit: z.ZodOptional<z.ZodString>;
    image_url: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const idParamSchema: z.ZodObject<{
    id: z.ZodCoercedString<unknown>;
}, z.core.$strip>;
export default router;
//# sourceMappingURL=nivedyamRoutes.d.ts.map