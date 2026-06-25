import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cluster from 'cluster';
import os from 'os';
import routesConfig from "./routes/routesConfig.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { globalRateLimiter } from "./middlewares/rateLimitMiddleware.js";
import { requestTimeout } from "./middlewares/timeoutMiddleware.js";
import db from "./config/db.js";
import redisClient from "./config/redis.js";
const CLUSTER_MODE = process.env.CLUSTER_MODE === 'true';
const isPrimary = cluster.isPrimary || cluster.isMaster;
if (CLUSTER_MODE && isPrimary) {
    const numCPUs = os.cpus().length;
    console.log(`[Cluster] Primary process ${process.pid} is running. Forking ${numCPUs} workers...`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.warn(`[Cluster] Worker ${worker.process.pid} died. Forking a new one...`);
        cluster.fork();
    });
}
else {
    const app = express();
    const PORT = process.env.PORT || 5000;
    const corsOptions = {
        origin: '*',
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    };
    app.use(cors(corsOptions));
    app.use(express.json());
    // Global timeout and rate limiting
    app.use(requestTimeout(parseInt(process.env.REQUEST_TIMEOUT_MS || "15000", 10)));
    app.use(globalRateLimiter);
    // Routes
    app.use('/api', routesConfig);
    app.get('/', (req, res) => {
        res.send('API is working 🚀');
    });
    // Error Handler (must be last)
    app.use(errorHandler);
    // Start the server
    const server = app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT} (PID: ${process.pid})`);
    });
    // Graceful shutdown
    let isShuttingDown = false;
    const gracefulShutdown = (signal) => {
        if (isShuttingDown)
            return;
        isShuttingDown = true;
        console.log(`[Shutdown] Received ${signal}. Starting graceful shutdown...`);
        server.close(async () => {
            console.log("[Shutdown] HTTP server closed.");
            try {
                if (db.native && typeof db.native.end === 'function') {
                    await db.native.end();
                    console.log("[Shutdown] Database pool closed.");
                }
                await redisClient.quit();
                console.log("[Shutdown] Redis connection closed.");
                process.exit(0);
            }
            catch (err) {
                console.error("[Shutdown] Error during shutdown cleanup:", err);
                process.exit(1);
            }
        });
        // Force close after timeout
        setTimeout(() => {
            console.error("[Shutdown] Forcefully shutting down after timeout.");
            process.exit(1);
        }, 10000);
    };
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    // Global uncaught exception handlers
    process.on('uncaughtException', (err) => {
        console.error("CRITICAL: Uncaught Exception:", err);
        process.exit(1);
    });
    process.on('unhandledRejection', (reason, promise) => {
        console.error("CRITICAL: Unhandled Rejection at:", promise, "reason:", reason);
    });
}
//# sourceMappingURL=index.js.map