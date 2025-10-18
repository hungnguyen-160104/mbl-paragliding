import app from "./app";
import { ENV } from "./config/env";
import { connectDB } from "./config/db";
import { initCloudinary } from "./config/cloudinary";

async function bootstrap() {
  await connectDB();
  initCloudinary();
  app.listen(ENV.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${ENV.PORT}`);
  });
}

bootstrap().catch((e) => {
  console.error("Failed to start", e);
  process.exit(1);
});
