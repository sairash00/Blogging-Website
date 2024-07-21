import {useEffect, useState} from "react";
import TopCard from "./TopCard.jsx";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import './ProfileSection.css'
import { IoMdArrowBack } from "react-icons/io";
import isLoggedIn from "../../utils/isLoggedIn.jsx";
import axios from 'axios'

const Profile = () => {

  const navigate = useNavigate()
  const [msg, setMsg] = useState()
  const[data, setData] = useState()
  const getDetails = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_GETUSER)
      const data = response.data.user
      setData(data)
      setMsg(data.message)
    } catch (error) {
      if(axios.isAxiosError(error)){
        setMsg(error.response.data.message)
      }else{
        setMsg("An unexpected error occurred")
      }
    }
  }

  const checkLogin = async() => {
    const loggedIn = await isLoggedIn(navigate)
  }

  useEffect(() =>{
    checkLogin()
    getDetails()
  }  ,[])

  function close(){
      setOpen(false)
  }

  return (
    <div id="maindiv" className="w-[80vw] py-4 overflow-y-auto h-[90vh] ">
      <button onClick={() => navigate(-1)} className='border w-fit p-1 hover:bg-slate-700 transition-all rounded-full' >
            <IoMdArrowBack className=' text-xl text-[#cfcfcf] ' />
        </button>
      <TopCard user={{
        avatar: data?.avatar,
        username: data?.username,
        followersCount: data?.followersCount,
        followingCount: data?.followingCount,
        posts: data?.posts,
        links: data?.links
      }} />
      <div>
        <div className="w-full  mt-5 gap-10 flex items-start justify-center ">
          <NavLink
            className={({ isActive }) => (isActive ? "active-link text-[#9ca3af]  " : " text-[#9ca3af]  ")}
            to={"/profile/posts"}
            // className=" text-[#9ca3af]  "
          >
            Posts
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link text-[#9ca3af]  " : " text-[#9ca3af]  ")}
            to={"/profile/following"}
            // className=" text-[#9ca3af]  "
          >
            Following
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link text-[#9ca3af]  " : " text-[#9ca3af]  ")}
            to={"/profile/followers"}
            // className=" text-[#9ca3af] "
          >
            Followers
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
