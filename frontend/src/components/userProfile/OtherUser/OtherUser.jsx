import React,{useState, useEffect} from "react";
import axios from 'axios'
import TopCard from "./TopCard.jsx";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const OtherUser = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [data, setData] = useState(null)
  const [msg, setMsg] = useState("")

   const getDetails = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_GETOTHERUSER, params)
      const data = response.data
      setData(data)
      setMsg(data.message)
    } catch (error) {
      if(axios.isAxiosError(error)){
        setMsg(error.response.data.message)
        console.log(error)
      }else{
        setMsg("An unexpected error occurred")
      }
    }
  }

  useEffect(()=>{
    getDetails()
  },[])


  return (
    <div id="maindiv" className="w-[80vw] py-4 overflow-y-auto h-[90vh] ">
      <button onClick={() => navigate(-1)} className='border w-fit p-1 hover:bg-slate-700 transition-all rounded-full' >
            <IoMdArrowBack className=' text-xl text-[#cfcfcf] ' />
        </button>
      <TopCard data={data?.user} id={data?.id} />
      <div>
        <div className="w-full  mt-5 gap-10 flex items-start justify-center ">
          <NavLink
            className={({ isActive }) => (isActive ? "active-link text-[#9ca3af]  " : " text-[#9ca3af]  ")}
            to={"posts"}
            // className=" text-[#9ca3af]  "
          >
            Posts
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link text-[#9ca3af]  " : " text-[#9ca3af]  ")}
            to={"following"}
            // className=" text-[#9ca3af]  "
          >
            Following
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link text-[#9ca3af]  " : " text-[#9ca3af]  ")}
            to={"followers"}
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

export default OtherUser;
