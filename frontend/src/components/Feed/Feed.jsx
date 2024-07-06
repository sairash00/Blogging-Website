import React from 'react'
import {NavLink, Outlet} from "react-router-dom"

const Feed = () => {
  return (
    <div className='w-[100vw] h-[90vh] overflow-y-auto flex justify-center '>
       <div className="w-[80vw] min-h-full flex flex-col items-center gap-1 ">
          <div className='w-[80vw] h-[10%] border-b border-[#224271] text-sm flex  items-end py-1 max-sm:gap-5  gap-10 ' >
            <NavLink className={({ isActive }) => (isActive ? "active-link text-[#9ca3af]  hover:text-[whitesmoke] transition-all " : " text-[#9ca3af]  hover:text-[whitesmoke] transition-all ")}   to={"/feeds/all"} >All</NavLink>
            <NavLink className={({ isActive }) => (isActive ? "active-link text-[#9ca3af]  hover:text-[whitesmoke] transition-all " : " text-[#9ca3af]  hover:text-[whitesmoke] transition-all ")}   to={"/feeds/following"} >Following</NavLink>
            <NavLink className={({ isActive }) => (isActive ? "active-link text-[#9ca3af]  hover:text-[whitesmoke] transition-all " : " text-[#9ca3af]  hover:text-[whitesmoke] transition-all ")}  to={"/feeds/followers"} >Followers</NavLink>
            <NavLink className={({ isActive }) => (isActive ? "active-link text-[#9ca3af]  hover:text-[whitesmoke] transition-all " : " text-[#9ca3af]  hover:text-[whitesmoke] transition-all ")}  to={"/feeds/create"} >
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#c1c1c1" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
            </NavLink>
          </div>
          
            <Outlet />
        
       </div>
    </div>
  )
}

export default Feed