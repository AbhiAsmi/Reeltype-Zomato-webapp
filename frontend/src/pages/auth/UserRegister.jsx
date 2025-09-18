import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.elements.fullName.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
      const response = await axios.post("http://localhost:3000/user/register", {
        fullName,
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/"); // go to homepage after success
      } else {
        alert("No token received from server.");
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-600">
      <div className="bg-white flex rounded-3xl shadow-lg overflow-hidden w-[90%] md:w-[70%] lg:w-[60%]">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
          {/* Logo */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-orange-600">Foodle</h1>
            <p className="text-sm text-gray-500">Made with love ❤️</p>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-2">Register</h2>
          <p className="text-gray-500 mb-6">Create your account</p>

          {/* Form */}
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              className="w-full px-4 py-3 mb-3 rounded-full bg-orange-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email Id"
              className="w-full px-4 py-3 mb-3 rounded-full bg-orange-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full px-4 py-3 mb-5 rounded-full bg-orange-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-full hover:bg-orange-700 transition"
            >
              Register
            </button>
          </form>

          {/* Already have account */}
          <p className="mt-4 text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/user/login"
              className="text-orange-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:flex w-1/2 bg-orange-100 items-center justify-center">
          <img
            src="https://cdn.dribbble.com/userupload/37101316/file/original-63a5e9f0f0e747f47f6ea1c3f9a078c6.png?resize=1024x831&vertical=center"
            alt="Burger"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
