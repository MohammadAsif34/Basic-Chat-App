import express from "express";
import { protect } from "../middleware/protected.middlewares.js";
import {
  accept,
  get_me,
  new_password,
  request,
  search,
  update_password,
  update_profile,
} from "./user.controllers.js";

const router = express.Router();

router.get("/", protect, get_me); // done fetch
router.put("/", protect, update_profile); // done update profile
router.post("/request/:to", protect, request); // done request-sent
router.post("/accept/:from", protect, accept); // done accept-sent
router.get("/search", search); // done search-user
router.post("/password", protect, new_password); // done new password
router.put("/password", protect, update_password); //

export default router;
