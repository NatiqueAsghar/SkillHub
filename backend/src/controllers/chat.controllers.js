import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Chat } from "../models/chat.model.js";

export const createChat = asyncHandler(async (req, res) => {
  const { users } = req.body;

  if (users.length === 0) {
    throw new ApiError(400, "Please provide all the details");
  }

  const chat = await Chat.create({
    users: users,
  });

  if (!chat) {
    throw new ApiError(500, "Error creating chat");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, chat, "Chat created successfully"));
});

export const getChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const chats = await Chat.find({ users: userId })
    .populate("users", "username name picture")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  if (!chats) {
    throw new ApiError(500, "Error fetching chats");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, chats, "Chats fetched successfully"));
});
