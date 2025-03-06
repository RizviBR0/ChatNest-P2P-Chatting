import React from "react";

const MessageItem = ({ message, isOwn }) => {
  // Format timestamp if available
  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    // If it's a Firebase timestamp, we need to convert it to a JS Date
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className={`flex mb-4 ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOwn
            ? "bg-indigo-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span
          className={`text-xs ${
            isOwn ? "text-indigo-100" : "text-gray-500"
          } block mt-1`}
        >
          {message.createdAt ? formatTime(message.createdAt) : "Sending..."}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;
