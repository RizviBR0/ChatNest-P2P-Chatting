import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

const useAuthStore = create((set) => ({
  currentUser: null,
  loading: true,
  error: null,

  init: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ currentUser: user, loading: false });
    });
    return unsubscribe;
  },

  clearError: () => {
    set({ error: null });
  },

  checkIfUserExists: async (email) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return methods.length > 0;
    } catch (error) {
      console.error("Error checking if user exists:", error);
      // Don't set an error state here to avoid confusing the user
      return false;
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      await signInWithEmailAndPassword(auth, email, password);
      set({ loading: false });
      return true;
    } catch (error) {
      console.error("Login error:", error);
      // Improve error messages for users
      let errorMessage = error.message;
      if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email. Please sign up.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Invalid password. Please try again.";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage =
          "Invalid credentials. Please check your email and password.";
      }
      set({ error: errorMessage, loading: false });
      return false;
    }
  },

  signup: async (email, password, displayName) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Create a user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        displayName,
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
      });

      set({ loading: false });
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      // Improve error messages for users
      let errorMessage = error.message;
      if (error.code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already registered. Please sign in instead.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use a stronger password.";
      }
      set({ error: errorMessage, loading: false });
      return false;
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });
      await signOut(auth);
      set({ loading: false, currentUser: null });
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      set({ error: error.message, loading: false });
      return false;
    }
  },
}));

export default useAuthStore;
