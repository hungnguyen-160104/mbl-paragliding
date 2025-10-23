import { Router } from "express";
import { postAsk } from "../controllers/chatbot.controller";

const router = Router();
router.post("/", postAsk); // POST /api/chatbot

export default router;
