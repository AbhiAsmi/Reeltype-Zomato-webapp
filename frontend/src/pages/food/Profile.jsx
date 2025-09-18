import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams(); // admin/foodPartner id from URL
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/foodpartner/profile/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodpartner);
        setVideos(response.data.foodItems || []);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, [id]);

  return (
    <div className="min-h-screen w-full bg-[#0b1220] text-white p-6 flex flex-col items-center">
      {/* Profile Info */}
      <div className="w-full max-w-md bg-[#111a2e] rounded-2xl shadow-lg p-6 flex flex-col items-center">
        <div className="flex items-center gap-4 w-full">
          <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden">
            {profile?.logo && (
              <img
                src={profile.logo}
                alt="Business logo"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{profile?.name}</h2>
            <p className="text-sm text-gray-400">{profile?.address}</p>
          </div>
        </div>

        <div className="flex justify-around w-full mt-6 border-t border-gray-600 pt-4">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400">Total Videos</span>
            <span className="text-xl font-bold">{videos.length}</span>
          </div>
        </div>

        {/* Add Food Button */}
        <div className="w-full mt-6">
          <Link
            to="/food/create"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center py-2 rounded-lg transition"
          >
            + Add Food
          </Link>
        </div>
      </div>

      {/* Admin Uploaded Videos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl mt-8">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video._id}
              className="h-40 bg-[#111a2e] rounded-lg shadow-md overflow-hidden group"
            >
              <video
                src={video.video}
                controls
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No videos uploaded yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
