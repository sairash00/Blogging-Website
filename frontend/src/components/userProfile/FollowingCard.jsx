import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isLoggedIn from '../../utils/isLoggedIn';
import axios from 'axios';

const FollowingCard = ({following}) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(true);
  const [msg, setMsg] = useState('');
  const[disable, setDisable] = useState(false)
  
  console.log(following)

  const id =following?._id;

  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await isLoggedIn(navigate);
      setCurrentUser(loggedIn.user);
      if (following?.following?.includes(loggedIn.user?._id)) {
        setIsFollowing(true);
      }
    };
    checkLogin();
  }, []);

  const follow = async () => {
    setDisable(true)
    try {
      const response = await axios.post(import.meta.env.VITE_FOLLOW, { id });
      const data = response.data;
      setMsg(data.message);
      setIsFollowing(true);
      setDisable(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMsg(error.response.data.message);
        setDisable(false)
      } else {
        setMsg("An unexpected error occurred");
        setDisable(false)

      }
    }
  };

  const unfollow = async () => {
    setDisable(true)
    try {
      const response = await axios.post(import.meta.env.VITE_UNFOLLOW, { id });
      const data = response.data;
      setMsg(data.message);
      setIsFollowing(false);
      setDisable(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMsg(error.response.data.message);
        setDisable(false)

      } else {
        setMsg("An unexpected error occurred");
        setDisable(false)

      }
    }
  };

  return (
    <div className='w-full h-[10vh] px-4 flex justify-between items-center rounded-md border border-[#224271]'>
      <div className='w-10 h-10 rounded-full  overflow-hidden  object-cover'>
        <img src={following?.avatar} alt="" />
      </div>
      <div className='flex items-center gap-2'>
        <span className='font-medium text-[#cfd5de]'>{ following?.username || "User"}</span>
      </div>
      <button 
        onClick={isFollowing ? unfollow : follow} 
        disabled = {disable}
        className={isFollowing 
          ? 'px-2 py-1 bg-red-700 rounded-md hover:bg-red-600 transition-all' 
          : 'px-2 py-1 text-[black] bg-slate-200 rounded-md hover:bg-slate-300 transition-all'
        }
      >
        {isFollowing ? "Unfollow" : "Follow"}
        
      </button>
    </div>
  );
};

export default FollowingCard;
