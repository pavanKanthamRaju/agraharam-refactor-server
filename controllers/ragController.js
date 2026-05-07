import { askRag } from "../services/rag/ragService.js";
import { storeEmbedded } from "../services/rag/storeEmbeddingService.js";



export const askRagData = async (req, res, next) => {
  try {
    const { question } = req.body;
    console.log("ask rag hit.....")

    if (!question) {
      return next(new AppError("Bad request", 400));
      next("Bad request", 400)
    }

    const answer = await askRag(question);

    if (!answer) {
         next("Bad request", 500)
    }

    res.status(200).json({
      status: "success",
      answer,
    });

  } catch (err) {
    console.error("askRagData error:", err);
    next(err); // ✅ THIS IS CRITICAL
  }
};

export const createAnsdStoreEmbedding = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
       next("Bad request", 400)
    }

    const response = await storeEmbedded(content);

    if (!response) {
        next("Bad request", 500)
    }

    res.status(201).json({
      status: "success",
      message: "Content stored successfully",
    });

  } catch (err) {
    console.error("createEmbedding error:", err);
    next(err); // ✅ THIS FIXES YOUR ISSUE
  }
};
