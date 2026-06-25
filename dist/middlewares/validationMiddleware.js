import { ZodError } from "zod";
export const validateRequest = (schemas) => {
    return async (req, res, next) => {
        try {
            if (schemas.params) {
                req.params = (await schemas.params.parseAsync(req.params));
            }
            if (schemas.query) {
                req.query = (await schemas.query.parseAsync(req.query));
            }
            if (schemas.body) {
                req.body = await schemas.body.parseAsync(req.body);
            }
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const fieldErrors = error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                }));
                res.status(400).json({
                    success: false,
                    message: "Validation failed",
                    errors: fieldErrors,
                });
                return;
            }
            next(error);
        }
    };
};
//# sourceMappingURL=validationMiddleware.js.map