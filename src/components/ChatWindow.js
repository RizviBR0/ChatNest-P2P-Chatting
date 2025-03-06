import React, { useState, useRef, useEffect } from "react";
import useChatsStore from "../store/chatStore";
import useAuthStore from "../store/authStore";
import MessageItem from "./MessageItem";

const ChatWindow = () => {
  const { activeChat, messages, sendMessage, loading } = useChatsStore();
  const { currentUser } = useAuthStore();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim() || !activeChat || !currentUser) return;

    sendMessage(currentUser.uid, activeChat.uid, newMessage);
    setNewMessage("");
  };

  if (!activeChat) {
    return (
      <div className="flex-1 bg-white p-8 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            Select a user to start chatting
          </h2>
          <p>Choose from the list on the left side</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 flex items-center">
        <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold mr-3">
          {activeChat.displayName
            ? activeChat.displayName[0].toUpperCase()
            : "?"}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {activeChat.displayName || "Unknown User"}
          </h3>
          <p className="text-sm text-gray-500">{activeChat.email}</p>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {loading ? (
          <div className="text-center text-gray-500 my-4">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 my-4">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                isOwn={message.senderId === currentUser.uid}
              />
            ))}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md disabled:bg-indigo-400"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
