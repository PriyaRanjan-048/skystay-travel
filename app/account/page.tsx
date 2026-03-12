"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUser, FaLock, FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the authentication logic
    console.log("Form submitted:", { email, password, name: isLogin ? undefined : name });
  };

  return (
    <div className="pt-36 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">
                {isLogin ? "Sign In to Your Account" : "Create an Account"}
              </h1>
              <p className="text-gray-600 mt-2">
                {isLogin
                  ? "Access your bookings, save favorites, and get personalized deals."
                  : "Join SkyStay for exclusive deals and a personalized experience."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <FaUser />
                    </span>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-input pl-10"
                      placeholder="John Doe"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input pl-10"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  {isLogin && (
                    <Link
                      href="/account/reset-password"
                      className="text-sm text-primary-600 hover:text-primary-800"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaLock />
                  </span>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input pl-10"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full btn btn-primary py-3"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="btn btn-outline py-2 flex justify-center items-center"
                >
                  <FaGoogle className="text-red-500" />
                </button>
                <button
                  type="button"
                  className="btn btn-outline py-2 flex justify-center items-center"
                >
                  <FaFacebook className="text-blue-600" />
                </button>
                <button
                  type="button"
                  className="btn btn-outline py-2 flex justify-center items-center"
                >
                  <FaApple />
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary-600 hover:text-primary-800 font-medium"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
