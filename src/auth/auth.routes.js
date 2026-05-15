import express from "express";
import { get_me, google_callback, login } from "./auth.controllers.js";
import { protect } from "../middleware/protected.middlewares.js";

const router = express.Router();

router.get("/me", protect, get_me);
router.post("/login", login);
router.post("/google-callback", google_callback);

export default router;
