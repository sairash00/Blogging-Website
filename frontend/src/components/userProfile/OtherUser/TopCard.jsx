import React, { useEffect, useState } from 'react'
import {Link, useParams, useNavigate } from 'react-router-dom'
import { IoCreateOutline } from "react-icons/io5";
import axios from 'axios'
import isLoggedIn from '../../../utils/isLoggedIn';

const TopCard = ({data, id}) => {


  const navigate = useNavigate()
  useEffect(() =>{
    const loggedIn = isLoggedIn(navigate)
  } ,[])



  const [me, setMe] = useState(false)
  const [msg, setMsg] = useState("")
  const [isFollowing,setIsFollowing] = useState(false)

  useEffect(()=>{
    if(data?._id === id){
      setMe(true)
    }else{
      setMe(false)
    }
  },[data,id])

  useEffect(() => {
    const isFollowing = data?.followers?.some(follower => follower._id === id);
    setIsFollowing(isFollowing);
  }, [data, id]);

  // console.log(me)
  const follow = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_FOLLOW,{id: data?._id});
      const info = response.data;
      setMsg(info.message);
      setIsFollowing(true);
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        setMsg(error.response.data.message);
      } else {
        setMsg("An unexpected error occurred");
      }
    }
  };

  const unfollow = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_UNFOLLOW, { id: data._id });
      const info = response.data;
      setMsg(info.message);
      setIsFollowing(false);
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        setMsg(error.response.data.message);
      } else {
        setMsg("An unexpected error occurred");
      }
    }
  };


    const handleClick = () => {
      if(isFollowing){
        unfollow()
      }else{
        follow()
      }
    }


  return (
    <div className=' w-full min-h-[50%] flex flex-wrap py-5  items-center justify-center gap-10 border-b border-[#224271] ' >
          <div className='w-[200px]  h-[200px] rounded-full  overflow-hidden object-cover '  ><img src={data?.avatar} alt="" /></div>
          <div className='flex flex-col gap-2' >
              <div className=' text-2xl flex gap-3 font-semibold ' >{data?.username || "user"} </div>
              <Link to={"/profile/posts"} className=' text-sm tracking-wide ' >Posts  <span className=' font-semibold text-md ' >{data?.posts?.length || 0}</span> </Link>
              <Link to={"/profile/followers"} className=' text-sm tracking-wide ' >Followers  <span className=' font-semibold text-md ' >{data?.followersCount || 0} </span> </Link>
              <Link to={"/profile/following"} className=' text-sm tracking-wide ' >Following  <span className=' font-semibold text-md ' >{data?.followingCount || 0} </span> </Link>
              {me ? null  : <button onClick={handleClick} className={isFollowing ? ' px-2 py-1 bg-red-700 text-sm transition-all text-[#fff] rounded-md hover:bg-red-800 ': ' px-2 py-1 bg-[whitesmoke] text-sm text-[#212121] rounded-md hover:bg-[#e2e2e2] '} >{isFollowing? "Unfollow" : "Follow"}</button>}
          </div>
      </div>
  )
}

export default TopCard