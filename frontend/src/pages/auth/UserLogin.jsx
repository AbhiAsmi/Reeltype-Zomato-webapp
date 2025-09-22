import React from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../api";

export default function UserLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
      const response = await API.post("/user/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
      } else {
        alert("No token received from server.");
        return;
      }

      console.log("Login Successful:", response.data);
      navigate("/reelfeed");
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      alert("Invalid email or password!");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
           USER Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Passwoed"
            className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="text-right">
            <a href="/user/register" className="text-green-600 text-sm hover:underline">
              register?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">Sau</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
