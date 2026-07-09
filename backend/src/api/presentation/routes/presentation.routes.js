import express from "express";
import {generatePresentation} from "../controller/presentation.controller.js";

const router = express.Router();

/**
 * @route POST /api/presentation/generate
 * @desc Generate AI Presentation
 * @access Private (or Public during development)
 */
router.post("/generate", generatePresentation);

export default router;
