// backend-mbl/src/routes/telegram.routes.ts
import { Router } from "express";
import { postNotifyTelegram } from "../controllers/telegram.controller";

const router = Router();
router.post("/", postNotifyTelegram); // POST /api/notify-telegram

export default router;
