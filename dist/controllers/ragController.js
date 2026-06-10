import { askRag } from "../services/rag/ragService.js";
import { storeEmbedded } from "../services/rag/storeEmbeddingService.js";
import { AppError } from "../middlewares/errorHandler.js";
export const askRagData = async (req, res, next) => {
    try {
        const { question } = req.body;
        console.log("ask rag hit.....");
        if (!question) {
            throw new AppError("Bad request", 400);
        }
        const answer = await askRag(question);
        if (!answer) {
            throw new AppError("Bad request", 500);
        }
        res.status(200).json({
            status: "success",
            answer,
        });
    }
    catch (err) {
        console.error("askRagData error:", err);
        next(err);
    }
};
export const createAndStoreEmbedding = async (req, res, next) => {
    try {
        const { content } = req.body;
        if (!content) {
            throw new AppError("Bad request", 400);
        }
        await storeEmbedded(content);
        res.status(201).json({
            status: "success",
            message: "Content stored successfully",
        });
    }
    catch (err) {
        console.error("createEmbedding error:", err);
        next(err);
    }
};
//# sourceMappingURL=ragController.js.map