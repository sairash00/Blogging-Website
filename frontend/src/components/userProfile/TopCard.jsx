import React, { useEffect, useState } from 'react'
import {Link, useParams } from 'react-router-dom'
import { IoCreateOutline } from "react-icons/io5";
import Update from './Update.jsx'    
import axios from 'axios';
import { FaFacebook, FaInstagram} from "react-icons/fa";
import {FaXTwitter} from 'react-icons/fa6'
import { AiOutlineLike } from "react-icons/ai";

const TopCard = ({user}) => {
  console.log(user)
  const [open, setOpen] = useState(false)
  return (
    <div className=' w-full min-h-[50%] flex flex-wrap py-5  items-center justify-center gap-10 border-b border-[#224271] ' >
          <div className='w-[200px] h-[200px] rounded-full  overflow-hidden  object-cover '  ><img src={user?.avatar} alt="" /></div>
          <div className='flex flex-col gap-2' >
              <div className=' text-2xl flex gap-3 font-semibold ' >{user?.username || "username"} <button onClick={() => {setOpen(true)}} ><IoCreateOutline/> </button> </div>
              <Link to={"/profile/posts"} className=' text-sm tracking-wide ' >Posts  <span className=' font-semibold text-md ' > {user?.posts?.length || 0 } </span> </Link>
              <Link to={"/profile/followers"} className=' text-sm tracking-wide ' >Followers  <span className=' font-semibold text-md ' >{user?.followersCount || 0 }</span> </Link>
              <Link to={"/profile/following"} className=' text-sm tracking-wide ' >Following  <span className=' font-semibold text-md ' >{user?.followingCount || 0 } </span> </Link>

          <div className='flex gap-2' >
             {
                user.links?.map((link,id) => (
                  <a key={id} target='_blank' href={link.link}>{
                    link.platform === "facebook" ?<FaFacebook />: link.platform === "instagram" ? <FaInstagram />: link.platform === "x" ? <FaXTwitter/> : null
                    }</a> 
                ))
               }
          </div>

          </div>
          <Update open = {open} setOpen = {setOpen} />
      </div>
  )
}

export default TopCard 