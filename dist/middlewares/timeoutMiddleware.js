export const requestTimeout = (timeoutMs) => {
    return (req, res, next) => {
        if (req.skipTimeout) {
            return next();
        }
        const timer = setTimeout(() => {
            if (!res.headersSent) {
                res.status(408).json({
                    success: false,
                    message: "Request Timeout"
                });
            }
        }, timeoutMs);
        res.on('finish', () => clearTimeout(timer));
        res.on('close', () => clearTimeout(timer));
        next();
    };
};
export const bypassTimeout = (req, res, next) => {
    req.skipTimeout = true;
    next();
};
//# sourceMappingURL=timeoutMiddleware.js.map