import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, signup, checkIfUserExists, currentUser, error, clearError } =
    useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customError, setCustomError] = useState("");

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // Clear errors when component unmounts or mode changes
  useEffect(() => {
    clearError && clearError();
    setCustomError("");
  }, [isSignUpMode, clearError]);

  const switchToSignUp = () => {
    setIsSignUpMode(true);
    setCustomError("");
  };

  const switchToSignIn = () => {
    setIsSignUpMode(false);
    setCustomError("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setCustomError("");
    setIsSubmitting(true);

    try {
      // Directly try to sign in without checking if user exists first
      // Firebase will handle the error if credentials are invalid
      const success = await login(email, password);
      if (!success) {
        // If login failed but no error was set, show a generic error
        setCustomError("Failed to sign in. Please check your credentials.");
      }
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setCustomError("");
    setIsSubmitting(true);

    try {
      // Check if user already exists
      const userExists = await checkIfUserExists(email);

      if (userExists) {
        setCustomError("User already exists, please sign in instead.");
        setIsSubmitting(false);
        return;
      }

      await signup(email, password, displayName);
    } catch (error) {
      console.error("Sign up error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUpMode ? "Create an account" : "Sign in to your account"}
          </h2>
        </div>

        {(error || customError) && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <p className="text-sm text-red-700">{customError || error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setCustomError("");
                }}
              />
            </div>

            {isSignUpMode && (
              <div>
                <label htmlFor="display-name" className="sr-only">
                  Display Name
                </label>
                <input
                  id="display-name"
                  name="displayName"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Display Name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={
                  isSignUpMode ? "new-password" : "current-password"
                }
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={isSignUpMode ? "Create a password" : "Password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setCustomError("");
                }}
              />
            </div>
          </div>

          <div className={isSignUpMode ? "space-y-3" : "space-x-3 flex"}>
            {!isSignUpMode && (
              <button
                type="button"
                onClick={handleSignIn}
                disabled={isSubmitting || !email || !password}
                className="group flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            )}

            {!isSignUpMode && (
              <button
                type="button"
                onClick={switchToSignUp}
                disabled={isSubmitting}
                className="group flex-1 flex justify-center py-2 px-4 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            )}

            {isSignUpMode && (
              <button
                type="button"
                onClick={handleSignUp}
                disabled={isSubmitting || !email || !password || !displayName}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? "Creating account..." : "Sign Up"}
              </button>
            )}

            {isSignUpMode && (
              <button
                type="button"
                onClick={switchToSignIn}
                className="w-full flex justify-center py-2 text-sm font-medium text-gray-600 hover:text-indigo-500"
              >
                ← Back to Sign In
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
