import { create } from "zustand";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../services/firebase";

const useChatsStore = create((set, get) => ({
  users: [],
  activeChat: null,
  messages: [],
  loading: false,
  error: null,

  // Fetch all users except current user
  fetchUsers: async (currentUserId) => {
    try {
      set({ loading: true, error: null });
      const usersRef = collection(db, "users");
      const q = query(usersRef);

      const querySnapshot = await getDocs(q);
      const users = [];

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.uid !== currentUserId) {
          users.push(userData);
        }
      });

      set({ users, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Set the active chat user
  setActiveChat: (user) => {
    set({ activeChat: user });
    // Load messages for this chat
    if (user) {
      get().fetchMessages(get().currentUserId, user.uid);
    }
  },

  // Generate a unique chat ID for two users
  getChatId: (uid1, uid2) => {
    return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
  },

  // Fetch messages between current user and selected user
  fetchMessages: (currentUserId, otherUserId) => {
    try {
      set({ loading: true, error: null });
      const chatId = get().getChatId(currentUserId, otherUserId);

      const messagesRef = collection(db, "chats", chatId, "messages");
      const q = query(messagesRef, orderBy("createdAt", "asc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          messages.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        set({ messages, loading: false });
      });

      // Return unsubscribe function to stop listening when needed
      return unsubscribe;
    } catch (error) {
      set({ error: error.message, loading: false });
      return () => {};
    }
  },

  // Send a new message
  sendMessage: async (currentUserId, receiverId, text) => {
    try {
      set({ loading: true, error: null });
      const chatId = get().getChatId(currentUserId, receiverId);

      await addDoc(collection(db, "chats", chatId, "messages"), {
        text,
        senderId: currentUserId,
        receiverId,
        createdAt: serverTimestamp(),
        read: false,
      });

      // Update last message in chat document
      await updateDoc(doc(db, "chats", chatId), {
        lastMessage: text,
        lastMessageAt: serverTimestamp(),
        lastSenderId: currentUserId,
      });

      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Set the current user ID (from auth)
  setCurrentUserId: (id) => {
    set({ currentUserId: id });
  },
}));

export default useChatsStore;
