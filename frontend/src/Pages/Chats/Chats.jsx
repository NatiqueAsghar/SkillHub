import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../../util/UserContext";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import RequestCard from "./RequestCard";

var socket;
const Chats = () => {
  const [showChatHistory, setShowChatHistory] = useState(true);
  const [showRequests, setShowRequests] = useState(null);
  const [requests, setRequests] = useState([]);
  const [requestLoading, setRequestLoading] = useState(false);
  const [acceptRequestLoading, setAcceptRequestLoading] = useState(false);

  const [scheduleModalShow, setScheduleModalShow] = useState(false);
  const [requestModalShow, setRequestModalShow] = useState(false);

  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [chatLoading, setChatLoading] = useState(true);
  const [chatMessageLoading, setChatMessageLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [selectedRequest, setSelectedRequest] = useState(null);

  const { user, setUser } = useUser();

  const navigate = useNavigate();

  const [scheduleForm, setScheduleForm] = useState({
    date: "",
    time: "",
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    socket = io(axios.defaults.baseURL);
    if (user) {
      socket.emit("setup", user);
    }
    socket.on("message recieved", (newMessageRecieved) => {
      console.log("New Message Recieved: ", newMessageRecieved);
      console.log("Selected Chat: ", selectedChat);
      console.log("Selected Chat ID: ", selectedChat.id);
      console.log("New Message Chat ID: ", newMessageRecieved.chatId._id);
      if (selectedChat && selectedChat.id === newMessageRecieved.chatId._id) {
        setChatMessages((prevState) => [...prevState, newMessageRecieved]);
      }
    });
    return () => {
      socket.off("message recieved");
    };
  }, [selectedChat]);

  const fetchChats = async () => {
    try {
      setChatLoading(true);
      const tempUser = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.get("http://localhost:8000/chat");
      toast.success(data.message);
      if (tempUser?._id) {
        const temp = data.data.map((chat) => {
          return {
            id: chat._id,
            name: chat?.users.find((u) => u?._id !== tempUser?._id).name,
            picture: chat?.users.find((u) => u?._id !== tempUser?._id).picture,
            username: chat?.users.find((u) => u?._id !== tempUser?._id).username,
          };
        });
        setChats(temp);
      }
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
        if (err.response.data.message === "Please Login") {
          localStorage.removeItem("userInfo");
          setUser(null);
          await axios.get("/auth/logout");
          navigate("/login");
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setChatLoading(false);
    }
  };

  const handleScheduleClick = () => {
    setScheduleModalShow(true);
  };

  const handleChatClick = async (chatId) => {
    try {
      setChatMessageLoading(true);
      const { data } = await axios.get(`http://localhost:8000/message/getMessages/${chatId}`);
      setChatMessages(data.data);
      setMessage("");
      const chatDetails = chats.find((chat) => chat.id === chatId);
      setSelectedChat(chatDetails);
      socket.emit("join chat", chatId);
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
        if (err.response.data.message === "Please Login") {
          localStorage.removeItem("userInfo");
          setUser(null);
          await axios.get("/auth/logout");
          navigate("/login");
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setChatMessageLoading(false);
    }
  };

  const sendMessage = async (e) => {
    try {
      socket.emit("stop typing", selectedChat._id);
      if (message === "") {
        toast.error("Message is empty");
        return;
      }
      const { data } = await axios.post("/message/sendMessage", { chatId: selectedChat.id, content: message });
      socket.emit("new message", data.data);
      setChatMessages((prevState) => [...prevState, data.data]);
      setMessage("");
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
        if (err.response.data.message === "Please Login") {
          await axios.get("/auth/logout");
          setUser(null);
          localStorage.removeItem("userInfo");
          navigate("/login");
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const getRequests = async () => {
    try {
      setRequestLoading(true);
      const { data } = await axios.get("/request/getRequests");
      setRequests(data.data);
      console.log(data.data);
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
        if (err.response.data.message === "Please Login") {
          await axios.get("/auth/logout");
          setUser(null);
          localStorage.removeItem("userInfo");
          navigate("/login");
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setRequestLoading(false);
    }
  };

  const handleTabClick = async (tab) => {
    if (tab === "chat") {
      setShowChatHistory(true);
      setShowRequests(false);
      await fetchChats();
    } else if (tab === "requests") {
      setShowChatHistory(false);
      setShowRequests(true);
      await getRequests();
    }
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setRequestModalShow(true);
  };

  const handleRequestAccept = async (e) => {
    console.log("Request accepted");

    try {
      setAcceptRequestLoading(true);
      const { data } = await axios.post("/request/acceptRequest", { requestId: selectedRequest._id });
      console.log(data);
      toast.success(data.message);
      setRequests((prevState) => prevState.filter((request) => request._id !== selectedRequest._id));
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
        if (err.response.data.message === "Please Login") {
          await axios.get("/auth/logout");
          setUser(null);
          localStorage.removeItem("userInfo");
          navigate("/login");
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setAcceptRequestLoading(false);
      setRequestModalShow(false);
    }
  };

  const handleRequestReject = async () => {
    console.log("Request rejected");
    try {
      setAcceptRequestLoading(true);
      const { data } = axios.post("/request/rejectRequest", { requestId: selectedRequest._id });
      console.log(data);
      toast.success(data.message);
      setRequests((prevState) => prevState.filter((request) => request._id !== selectedRequest._id));
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
        if (err.response.data.message === "Please Login") {
          await axios.get("/auth/logout");
          setUser(null);
          localStorage.removeItem("userInfo");
          navigate("/login");
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setAcceptRequestLoading(false);
      setRequestModalShow(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section */}
      <div className="w-1/4 bg-white border-r border-gray-300 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-300">
          <button
            className={`flex-1 py-2 px-4 font-medium ${showChatHistory ? "bg-teal-400 text-black" : "bg-gray-800 text-white"} rounded-t-lg border border-gray-300`}
            onClick={() => handleTabClick("chat")}
          >
            Chat History
          </button>
          <button
            className={`flex-1 py-2 px-4 font-medium ${showRequests ? "bg-teal-400 text-black" : "bg-gray-800 text-white"} rounded-t-lg border border-gray-300`}
            onClick={() => handleTabClick("requests")}
          >
            Requests
          </button>
        </div>

        {/* Chat History or Requests List */}
        <div className="flex-1 overflow-y-auto">
          {showChatHistory && (
            <div className="p-2">
              {chatLoading ? (
                <div className="flex justify-center items-center mt-5">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => handleChatClick(chat.id)}
                      className={`cursor-pointer mb-2 p-2 rounded ${selectedChat?.id === chat?.id ? "bg-teal-400" : "bg-gray-200"}`}
                    >
                      {chat.name}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
          {showRequests && (
            <div className="p-2">
              {requestLoading ? (
                <div className="flex justify-center items-center mt-5">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  {requests.map((request) => (
                    <div
                      key={request.id}
                      onClick={() => handleRequestClick(request)}
                      className={`cursor-pointer mb-2 p-2 rounded ${selectedRequest && selectedRequest.id === request.id ? "bg-teal-400" : "bg-gray-200"}`}
                    >
                      {request.name}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col">
        {/* Profile Bar */}
        {selectedChat && (
          <div className="flex justify-between items-center p-2 border-b border-gray-800 min-h-[50px]">
            <div className="flex items-center">
              <img
                src={selectedChat?.picture ? selectedChat.picture : "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="font-sans text-gray-800">{selectedChat?.username}</span>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
              onClick={handleScheduleClick}
            >
              Request Video Call
            </button>
          </div>
        )}

        {/* Chat Interface */}
        <div className="flex-1 relative" style={{ height: "calc(100vh - 160px)" }}>
          {/* Chat Messages */}
          <div className="h-[calc(100%-50px)] text-teal-400 p-5 overflow-y-auto relative">
            {selectedChat ? (
              <div className="h-full overflow-y-auto">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex mb-2 ${message.sender._id == user._id ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`p-2 rounded-lg max-w-[70%] ${message.sender._id === user._id ? "bg-teal-400 text-white" : "bg-gray-800 text-white"}`}
                      style={{ textAlign: message.sender._id == user._id ? "right" : "left" }}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            ) : (
              <>
                {chatMessageLoading ? (
                  <div className="h-full flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="h-full w-full flex flex-col justify-center items-center">
                    <h3 className="text-center">Select a chat to start messaging</h3>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Chat Input */}
          {selectedChat && (
            <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-800 flex items-center">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 p-2 rounded border text-blak border-gray-800 mr-2"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Request Modal */}
      {requestModalShow && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setRequestModalShow(false)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-xl font-bold mb-4">Confirm your choice?</h2>
            {selectedRequest && (
              <RequestCard
                name={selectedRequest?.name}
                skills={selectedRequest?.skillsProficientAt}
                rating="4"
                picture={selectedRequest?.picture}
                username={selectedRequest?.username}
                onClose={() => setSelectedRequest(null)}
              />
            )}
            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                onClick={handleRequestAccept}
              >
                {acceptRequestLoading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  </div>
                ) : (
                  "Accept!"
                )}
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                onClick={handleRequestReject}
              >
                {acceptRequestLoading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  </div>
                ) : (
                  "Reject"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Video Call Modal */}
      {scheduleModalShow && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
          <div className="bg-gray-800 text-teal-400 p-8 rounded-lg relative z-50 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Request a Meeting</h3>
            <form>
              <div className="mb-4">
                <label className="block mb-2">Preferred Date</label>
                <input
                  type="date"
                  className="w-full p-2 rounded text-black"
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2">Preferred Time</label>
                <input
                  type="time"
                  className="w-full p-2 rounded text-black"
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  onClick={async (e) => {
                    e.preventDefault();
                    if (scheduleForm.date === "" || scheduleForm.time === "") {
                      toast.error("Please fill all the fields");
                      return;
                    }

                    scheduleForm.username = selectedChat.username;
                    try {
                      const { data } = await axios.post("/user/sendScheduleMeet", scheduleForm);
                      toast.success("Request mail has been sent successfully!");
                      setScheduleForm({
                        date: "",
                        time: "",
                      });
                    } catch (error) {
                      console.log(error);
                      if (error?.response?.data?.message) {
                        toast.error(error.response.data.message);
                        if (error.response.data.message === "Please Login") {
                          localStorage.removeItem("userInfo");
                          setUser(null);
                          await axios.get("/auth/logout");
                          navigate("/login");
                        }
                      } else {
                        toast.error("Something went wrong");
                      }
                    }
                    setScheduleModalShow(false);
                  }}
                >
                  Submit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-2"
                  onClick={() => setScheduleModalShow(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;