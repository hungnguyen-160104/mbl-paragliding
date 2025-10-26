// backend-mbl/src/routes/booking.routes.ts
import { Router } from "express";
import { getLocations, validateBooking, createBooking } from "../controllers/booking.controller";

const router = Router();

router.get("/locations", getLocations);     // GET /api/booking/locations
router.post("/validate", validateBooking);  // POST /api/booking/validate
router.post("/create", createBooking);      // POST /api/booking/create

export default router;
