// backend-mbl/src/app.ts  (thay phần CORS như dưới; giữ các phần còn lại nguyên như bạn đang có)
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ENV } from "./config/env";
import routes from "./routes";
import { notFound, errorHandler } from "./middlewares/error";
import chatbotRouter from "./routes/chatbot.route";

const app = express();

// CORS cho nhiều origin (CSV) & cho phép Authorization
const allowed = (ENV.CORS_ORIGIN || "*")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true); // Postman/healthcheck
    if (allowed.includes("*") || allowed.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: false
}));

app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/chatbot", chatbotRouter);
app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
