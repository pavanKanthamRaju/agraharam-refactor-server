import { z } from 'zod';
declare const router: import("express-serve-static-core").Router;
export declare const createAnnouncementSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodString;
    description: z.ZodString;
}, z.core.$strip>;
export declare const updateAnnouncementSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodString;
    description: z.ZodString;
}, z.core.$strip>;
export declare const idParamSchema: z.ZodObject<{
    id: z.ZodCoercedString<unknown>;
}, z.core.$strip>;
export default router;
//# sourceMappingURL=announcementRoute.d.ts.map