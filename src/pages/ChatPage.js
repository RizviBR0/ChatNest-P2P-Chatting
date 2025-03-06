import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import useAuthStore from "../store/authStore";
import useChatsStore from "../store/chatStore";

const ChatPage = () => {
  const { currentUser, logout } = useAuthStore();
  const { fetchUsers, setCurrentUserId } = useChatsStore();

  useEffect(() => {
    if (currentUser) {
      setCurrentUserId(currentUser.uid);
      fetchUsers(currentUser.uid);
    }
  }, [currentUser, fetchUsers, setCurrentUserId]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4">
        <div className="mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">ChatNest</h1>
          <div className="flex items-center space-x-4">
            <span>{currentUser?.displayName || currentUser?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-indigo-700 hover:bg-indigo-800 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 overflow-hidden">
        <Sidebar />
        <ChatWindow />
      </main>
    </div>
  );
};

export default ChatPage;
