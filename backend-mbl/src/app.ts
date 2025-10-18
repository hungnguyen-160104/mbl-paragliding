import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ENV } from "./config/env";
import routes from "./routes";
import { notFound, errorHandler } from "./middlewares/error";

const app = express();

app.use(cors({ origin: ENV.CORS_ORIGIN, credentials: false }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
