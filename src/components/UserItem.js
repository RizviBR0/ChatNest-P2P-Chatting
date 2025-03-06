import React from "react";

const UserItem = ({ user, isActive, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={`px-4 py-3 flex items-center cursor-pointer transition hover:bg-gray-100 ${
        isActive ? "bg-indigo-50 border-l-4 border-indigo-500" : ""
      }`}
    >
      <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold mr-3">
        {user.displayName ? user.displayName[0].toUpperCase() : "?"}
      </div>
      <div className="flex-1">
        <h3 className="text-gray-800 font-medium">
          {user.displayName || "Unknown User"}
        </h3>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </li>
  );
};

export default UserItem;
