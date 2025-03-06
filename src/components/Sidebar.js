import React from "react";
import useChatsStore from "../store/chatStore";
import UserItem from "./UserItem";

const Sidebar = () => {
  const { users, activeChat, setActiveChat, loading } = useChatsStore();

  return (
    <div className="w-1/4 bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">Users</h2>
      </div>

      <div className="overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No users found</div>
        ) : (
          <ul>
            {users.map((user) => (
              <UserItem
                key={user.uid}
                user={user}
                isActive={activeChat?.uid === user.uid}
                onClick={() => setActiveChat(user)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
