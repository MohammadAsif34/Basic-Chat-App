import express from "express";
import { get_messages, send } from "./message.controllers.js";

const router = express.Router();

router.get("/messages/:chatId", get_messages);
router.post("/messages", send);

export default router;
