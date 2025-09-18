import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark, FaRegCommentDots, FaHome, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const userId = localStorage.getItem("userId"); 
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/food/fetch", { withCredentials: true });
        setVideos(response.data.foodItems || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target;
          if (entry.isIntersecting) video.play();
          else video.pause();
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach(video => video && observer.observe(video));

    return () => {
      videoRefs.current.forEach(video => video && observer.unobserve(video));
    };
  }, [videos]);

  const likeVideo = async item => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/food/like",
        { foodId: item._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setVideos(prev =>
        prev.map(v =>
          v._id === item._id
            ? { ...v, likeCount: response.data.like ? (v.likeCount || 0) + 1 : (v.likeCount || 1) - 1 }
            : v
        )
      );
    } catch (err) {
      console.error("Error liking video:", err);
    }
  };

  const saveVideo = async item => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/food/save",
        { foodId: item._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setVideos(prev =>
        prev.map(v =>
          v._id === item._id
            ? { ...v, savesCount: response.data.save ? (v.savesCount || 0) + 1 : (v.savesCount || 1) - 1 }
            : v
        )
      );
    } catch (err) {
      console.error("Error saving video:", err);
    }
  };

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black text-white relative">
      {videos.map((item, index) => (
        <div key={item._id} className="h-screen w-full flex items-center justify-center relative snap-start">
          <video ref={el => (videoRefs.current[index] = el)} src={item.video} className="h-full w-full object-cover" loop muted />
          
          <div className="absolute bottom-24 md:bottom-20 left-4 md:left-5 bg-black/40 p-3 rounded-lg max-w-xs md:max-w-md">
            <h2 className="text-lg md:text-xl font-bold">{item.name}</h2>
            <p className="text-xs md:text-sm text-gray-200 line-clamp-3">{item.description}</p>
          </div>

          <div className="absolute right-4 md:right-5 bottom-32 md:bottom-24 flex flex-col items-center gap-4 md:gap-6">
            <button onClick={() => likeVideo(item)} className="flex flex-col items-center">
              {item.likeCount > 0 ? <FaHeart className="text-red-500 text-xl md:text-2xl" /> : <FaRegHeart className="text-xl md:text-2xl" />}
              <span className="text-xs md:text-sm">{item.likeCount || 0}</span>
            </button>
            <button onClick={() => saveVideo(item)} className="flex flex-col items-center">
              {item.savesCount > 0 ? <FaBookmark className="text-yellow-400 text-xl md:text-2xl" /> : <FaRegBookmark className="text-xl md:text-2xl" />}
              <span className="text-xs md:text-sm">{item.savesCount || 0}</span>
            </button>
            <div className="flex flex-col items-center">
              <FaRegCommentDots className="text-xl md:text-2xl" />
              <span className="text-xs md:text-sm">0</span>
            </div>
          </div>
        </div>
      ))}

      <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-700 flex justify-around items-center py-2 md:py-3">
        <button onClick={() => navigate("/")} className="flex flex-col items-center text-white text-sm md:text-base">
          <FaHome className="text-2xl md:text-3xl" />
          <span>Home</span>
        </button>
        <button
          onClick={() => {
            if (userId) navigate(`/food/savedfood/${userId}`);
          }}
          className="flex flex-col items-center text-white text-sm md:text-base"
        >
          <FaSave className="text-2xl md:text-3xl" />
          <span>Saved</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
