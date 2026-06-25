import { z } from "zod";
declare const router: import("express-serve-static-core").Router;
export declare const addItemSchema: z.ZodObject<{
    item_name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    default_quantity: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    price: z.ZodCoercedNumber<unknown>;
    units: z.ZodOptional<z.ZodString>;
    image: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const updateItemSchema: z.ZodObject<{
    item_name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    default_quantity: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    price: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    units: z.ZodOptional<z.ZodString>;
    image: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const idParamSchema: z.ZodObject<{
    id: z.ZodCoercedString<unknown>;
}, z.core.$strip>;
export default router;
//# sourceMappingURL=itemRoutes.d.ts.map