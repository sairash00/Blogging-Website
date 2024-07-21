import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { FaFacebook, FaInstagram} from "react-icons/fa";
import {FaXTwitter} from 'react-icons/fa6'
import { AiOutlineLike } from "react-icons/ai";
// import axios from 'axios';

const FeedsCard = ({post}) => {
  return (
    <Link to={`/feeds/${post._id}`} className='w-[45%] hover:border-[#4e71a5] rounded-md px-2 py-2 flex flex-col gap-3 justify-evenly  max-md:w-full max-h-[30vh] border border-[#224271] ' >
        <h1 className=' text-xl font-bold max-sm:text-[1rem] tracking-wide ' >{post.title || ""} </h1>
        <p className=' text-sm tracking-wide truncate '>{post.content || ""} </p>
        <div className='flex items-center justify-between ' >

           <div className='flex items-center gap-3 ' >
                <Link to={`/otherUser/${post.author?._id}/posts`} className='w-10 h-10 overflow-hidden rounded-full max-md:w-6 max-md:h-6 bg-white' >{ post.author?.avatar ? <img src={post.author?.avatar}/> : <img src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png" />  }</Link>
                <div className='tex-sm tracking-tight ' >{post.author?.username || "Unknown"}</div>
           </div>
            
           <div className=' flex gap-3 items-center' >
                <div className='flex items-center gap-1' >
                    <AiOutlineLike className='text-xl'  /> 
                    <div 
                    onClick={(e) => {
                      e.stopPropagation()
                      setClicked(!clicked)
                    }}
                    
                    className= 'text-sm bg-transparent' >{post?.likes || 0}</div>
                </div>
               {
                post.author?.links?.map((link,id) => (
                  <a key={id} className='' onClick={(e) =>e.stopPropagation() } href={link.link}>{
                    link.platform === "facebook" ?<FaFacebook />: link.platform === "instagram" ? <FaInstagram />: link.platform === "x" ? <FaXTwitter/> : null
                    }</a> 
                ))
               }
               
            </div>
        </div>
    </Link>

  )
}

export default FeedsCard