import { z } from "zod";
declare const router: import("express-serve-static-core").Router;
export declare const createPaymentOrderSchema: z.ZodObject<{
    amount: z.ZodCoercedNumber<unknown>;
    currency: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const verifyPaymentSchema: z.ZodObject<{
    razorpay_order_id: z.ZodString;
    razorpay_payment_id: z.ZodString;
    razorpay_signature: z.ZodString;
    user_id: z.ZodCoercedString<unknown>;
    pooja_id: z.ZodCoercedString<unknown>;
    total_amount: z.ZodCoercedNumber<unknown>;
    booking_date: z.ZodString;
    booking_time: z.ZodString;
    phone_number: z.ZodString;
    address: z.ZodString;
}, z.core.$strip>;
export default router;
//# sourceMappingURL=paymentRoutes.d.ts.map