import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Request } from "../models/request.model.js";
import { Chat } from "../models/chat.model.js";

export const createRequest = asyncHandler(async (req, res, next) => {
  const { receiverID } = req.body;
  const senderID = req.user._id;

  const existingRequest = await Request.find({
    sender: senderID,
    receiver: receiverID,
  });

  if (existingRequest.length > 0) {
    throw new ApiError(400, "Request already exists");
  }

  const receiver = await Request.create({
    sender: senderID,
    receiver: receiverID,
  });

  if (!receiver) return next(new ApiError(500, "Request not created"));

  res
    .status(201)
    .json(new ApiResponse(201, receiver, "Request created successfully"));
});

export const getRequests = asyncHandler(async (req, res, next) => {
  const receiverID = req.user._id;

  const requests = await Request.find({
    receiver: receiverID,
    status: "Pending",
  }).populate("sender");

  if (requests.length > 0) {
    const sendersDetails = requests.map((request) => {
      return request._doc.sender;
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, sendersDetails, "Requests fetched successfully")
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, requests, "Requests fetched successfully"));
});

export const acceptRequest = asyncHandler(async (req, res, next) => {
  const { requestId } = req.body;
  const senderId = req.user._id;

  const existingRequest = await Request.find({
    sender: requestId,
    receiver: senderId,
  });

  if (existingRequest.length === 0) {
    throw new ApiError(400, "Request does not exist");
  }

  const existingChat = await Chat.find({
    users: { $all: [requestId, senderId] },
  });

  if (existingChat.length > 0) {
    throw new ApiError(400, "Chat already exists");
  }

  const chat = await Chat.create({
    users: [requestId, senderId],
  });

  if (!chat) return next(new ApiError(500, "Chat not created"));

  await Request.findOneAndUpdate(
    { sender: requestId, receiver: senderId },
    {
      status: "Connected",
    }
  );

  res
    .status(201)
    .json(new ApiResponse(201, chat, "Request accepted successfully"));
});

export const rejectRequest = asyncHandler(async (req, res, next) => {
  const { requestId } = req.body;
  const senderId = req.user._id;

  const existingRequest = await Request.find({
    sender: requestId,
    receiver: senderId,
    status: "Pending",
  });

  if (existingRequest.length === 0) {
    throw new ApiError(400, "Request does not exist");
  }

  await Request.findOneAndUpdate(
    { sender: requestId, receiver: senderId },
    { status: "Rejected" }
  );

  res
    .status(200)
    .json(new ApiResponse(200, null, "Request rejected successfully"));
});
