import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaUserCircle, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f1eb] flex justify-center">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-md p-4 md:p-6">
        <header className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <div className="text-orange-500 font-bold text-2xl">🍪 Crave</div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
            <Link to="/reelfeed" className="text-orange-500">Home</Link>
            <Link to="/user/login">Log In</Link>
            <Link to="/reelfeed" className="text-blue-600">Foods</Link>
            <Link to="/user/food-register" className="text-red-600">Admin</Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <FaSearch className="cursor-pointer" />
            <Link
              to="/user/register"
              className="text-sm font-semibold px-3 py-1 bg-orange-500 text-white rounded-lg"
            >
              Sign Up
            </Link>
            <FaShoppingCart className="cursor-pointer text-orange-500 text-xl" />
          </div>
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </header>
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-4 text-lg font-medium">
            <Link to="/reelfeed" className="text-orange-500">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/user/login">Sign In</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/user/food-register" className="text-red-600">Admin SignUp</Link>
            <div className="flex items-center gap-4 pt-4 border-t">
              <FaSearch className="cursor-pointer" />
              <Link to="/login">
                <FaUserCircle className="cursor-pointer text-xl" />
              </Link>
              <Link
                to="/user/register"
                className="text-sm font-semibold px-3 py-1 bg-orange-500 text-white rounded-lg"
              >
                Sign Up
              </Link>
              <FaShoppingCart className="cursor-pointer text-orange-500 text-xl" />
            </div>
          </div>
        )}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-16">
          <div className="space-y-6 text-center ml-[100px] h-[80vh] pt-[80px] md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Enjoy healthy <br className="hidden md:block" /> and delicious <br className="hidden md:block" /> food.
            </h1>
            <div className="relative">
              <Link to="/reelfeed" className="rounded-full border-2 border-black px-6 py-3 text-lg font-semibold hover:bg-black hover:text-white transition">
                Go to Reel
              </Link>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <img
                src="https://i.pinimg.com/736x/d7/15/36/d715369c14fc3fb200dd202a582fa1f3.jpg"
                alt="user"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">Ryan Garcia</p>
                <p className="text-sm text-gray-500">⭐⭐⭐⭐⭐</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
            <img
              src="https://i.pinimg.com/736x/17/e5/05/17e505f69905eb03d9d383414347de0d.jpg"
              alt="shake"
              className="w-48 sm:w-56 h-72 sm:h-80 object-cover rounded-2xl shadow-lg"
            />
            <div className="space-y-4 max-w-xs text-center sm:text-left">
              <img
                src="https://i.pinimg.com/736x/c3/15/f2/c315f238994440a1342f971546a2ce71.jpg"
                alt="shake2"
                className="w-32 sm:w-40 h-48 sm:h-60 object-cover rounded-2xl shadow-lg mx-auto sm:mx-0"
              />
              <p className="text-sm text-gray-600">
                Our milkshakes are crafted with the finest ingredients,
                offering a delightful refreshing treat perfect for any time.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
