import { z } from "zod";
declare const router: import("express-serve-static-core").Router;
export declare const askRagSchema: z.ZodObject<{
    question: z.ZodString;
}, z.core.$strip>;
export declare const storeEmbedSchema: z.ZodObject<{
    content: z.ZodString;
}, z.core.$strip>;
export default router;
//# sourceMappingURL=ragRouter.d.ts.map