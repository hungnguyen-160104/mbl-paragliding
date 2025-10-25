import { Router } from "express";
import {
  listProducts,
  getProductBySlug,
  createProductCtrl,
  updateProduct,
  deleteProduct,
  publishProduct,
} from "../controllers/products.controller";
// import { auth } from "../middlewares/auth"; // nếu muốn bảo vệ admin

const router = Router();

// Public
router.get("/", listProducts);
router.get("/:slug", getProductBySlug);

// Admin (tuỳ bạn bật auth)
// router.use(auth);
router.post("/", createProductCtrl);
router.patch("/:id", updateProduct);
router.patch("/:id/publish", publishProduct);
router.delete("/:id", deleteProduct);

export default router;
