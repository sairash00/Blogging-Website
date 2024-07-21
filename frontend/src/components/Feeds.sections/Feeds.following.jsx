import React, { useEffect, useState } from "react";
import FeedsCard from "./FeedsCard.jsx";
import "./feedsSection.css";
import axios from "axios";
import isLoggedIn from "../../utils/isLoggedIn.jsx";
import { useNavigate } from "react-router-dom";

const FeedsFollowing = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await isLoggedIn(navigate);
    };
    checkLogin();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(import.meta.env.VITE_GETFOLLOWINGPOST);
        const data = response.data;
        setData(data.posts);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return;
        } else {
          return;
        }
      }
    };

    getPosts();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center ">
        <div className="w-10 h-10 rounded-full border-b-2 animate-spin "></div>
      </div>
    )
  }
  return (
    <div
      id="maindiv"
      className=" w-[100%] py-10 h-[90%] flex flex-wrap gap-4 overflow-y-auto"
    >
      {data?.map((post) => (
        <FeedsCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default FeedsFollowing;
