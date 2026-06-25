import { z } from "zod";
declare const router: import("express-serve-static-core").Router;
export declare const placeOrderSchema: z.ZodObject<{
    user_id: z.ZodCoercedString<unknown>;
    pooja_id: z.ZodCoercedString<unknown>;
    total_amount: z.ZodCoercedNumber<unknown>;
    booking_date: z.ZodString;
    booking_time: z.ZodString;
    phone_number: z.ZodString;
    address: z.ZodString;
}, z.core.$strip>;
export declare const userIdParamSchema: z.ZodObject<{
    user_id: z.ZodCoercedString<unknown>;
}, z.core.$strip>;
export default router;
//# sourceMappingURL=orderRoutes.d.ts.map