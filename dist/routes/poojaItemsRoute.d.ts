import { z } from "zod";
declare const router: import("express-serve-static-core").Router;
export declare const createPoojaItemSchema: z.ZodObject<{
    pooja_id: z.ZodCoercedString<unknown>;
    item_id: z.ZodCoercedString<unknown>;
    quantity: z.ZodDefault<z.ZodOptional<z.ZodCoercedString<unknown>>>;
    price: z.ZodCoercedNumber<unknown>;
    units: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updatePoojaItemSchema: z.ZodObject<{
    quantity: z.ZodOptional<z.ZodCoercedString<unknown>>;
    price: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const poojaIdParamSchema: z.ZodObject<{
    pooja_id: z.ZodCoercedString<unknown>;
}, z.core.$strip>;
export declare const idParamSchema: z.ZodObject<{
    id: z.ZodCoercedString<unknown>;
}, z.core.$strip>;
export default router;
//# sourceMappingURL=poojaItemsRoute.d.ts.map