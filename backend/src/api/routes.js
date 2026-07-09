import express from "express";

import authRoutes from "./auth/routes/auth.routes.js";
import questionsRoutes from "./question/routes/question.routes.js";
import answersRoutes from "./answer/routes/answer.routes.js";
import ragRoutes from "./rag/routes/rag.routes.js";
// import presentationRoutes from "./auth/routes/presentation.routes.js";

import presentationRoutes from "./presentation/routes/presentation.routes.js";

const mainRouter = express.Router();

mainRouter.use("/auth", authRoutes);
mainRouter.use("/questions", questionsRoutes);
mainRouter.use("/answers", answersRoutes);
mainRouter.use("/rag", ragRoutes);
mainRouter.use("/presentation", presentationRoutes);

export default mainRouter;
