import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import API from "../../api";

export default function SaveFood() {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSavedFood = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get(
          `/food/savedfood/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setVideos(response.data.savedfood || []);
        if (response.data.user) setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    if (id) fetchSavedFood();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white flex justify-center p-4">
      <div className="w-full max-w-5xl">
        {user && (
          <div className="flex items-center gap-4 pb-6 border-b border-gray-700">
            <img
              src={user.profilePic}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div>
              <h1 className="text-xl font-bold">{user.name}</h1>
              <p className="text-gray-400 text-sm">
                {videos.length} Saved Videos
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {videos.map((item) => (
            <div
              key={item._id}
              className="relative group cursor-pointer rounded-lg overflow-hidden bg-black"
            >
              <video
                src={item.food.video} 
                className="w-full h-48 object-cover"
                controls
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-white font-semibold text-2xl">▶</span>
              </div>
            </div>
          ))}
        </div>

        {videos.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No saved videos yet 🎥</p>
          </div>
        )}
      </div>
    </div>
  );
}
