import express from "express";
import {
  sendMessage,
  getMessages,
  deleteMessage,
} from "../controllers/message.controllers.js";
import { verifyJWT_username } from "../middlewares/verifyJWT.middleware.js";

const router = express.Router();

router.post("/sendMessage", verifyJWT_username, sendMessage);
router.get("/getMessages/:chatId", verifyJWT_username, getMessages);
router.delete("/deleteMessage/:messageId", verifyJWT_username, deleteMessage);

export default router;
