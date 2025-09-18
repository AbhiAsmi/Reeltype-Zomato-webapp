import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = e.target.foodVideo.files[0];

    if (!fileInput) {
      alert("Please select a video!");
      return;
    }

    formData.append("video", fileInput);
    formData.append("name", e.target.foodName.value);
    formData.append("description", e.target.description.value);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to create a food item.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/food/create",
        formData,
        {withCredentials:true,
        
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Food created:", res.data);
      navigate(`/foodpartner/profile/${res.data.food.foodPartner}`);
    } catch (error) {
      console.error("Error creating food:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        alert("Unauthorized: Please log in again.");
      } else {
        alert("Failed to create food item.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4">
      <form
        className="bg-gray-900/80 border border-gray-700 shadow-xl rounded-2xl w-full max-w-md p-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold text-white mb-2">Create Food</h2>
        <p className="text-sm text-gray-400 mb-6">
          Upload a short video, give it a name, and add a description.
        </p>
        <div className="mb-5">
          <label htmlFor="foodVideo" className="block text-sm font-medium text-gray-300 mb-2">
            Food Video
          </label>
          <input
            type="file"
            name="foodVideo"
            id="foodVideo"
            accept="video/mp4,video/webm,video/mov"
            className="w-full text-gray-300 bg-gray-800 border border-gray-700 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="foodName" className="block text-sm font-medium text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            id="foodName"
            name="foodName"
            placeholder="e.g., Spicy Paneer Wrap"
            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Write a short description: ingredients, taste, spice level, etc."
            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
        >
          Save Food
        </button>
      </form>
    </div>
  );
};

export default CreateFood;
