import React from 'react'
import {Link} from 'react-router-dom'
import { FaFacebook, FaInstagram} from "react-icons/fa";
import {FaXTwitter} from 'react-icons/fa6'

const PostCard = () => {
  return (
    <Link to={"/feeds/699"} className='w-[45%] hover:border-[#4e71a5 ] rounded-md px-2 py-2 flex flex-col gap-3 justify-evenly  max-md:w-full min-h-[30vh] border border-[#224271] ' >
        <h1 className=' text-xl  text-[#d2d6de] font-bold max-sm:text-[1rem] tracking-wide ' >Blog Title can be long very long LONGER THAN THIS</h1>
        <p className=' text-sm text-[#9ca3af] tracking-wide truncate '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure aliquam dolor at earum maiores facilis excepturi doloremque blanditiis libero, repellendus eveniet ratione totam ipsa eum, ad distinctio culpa adipisci accusamus! Minima, repellendus. Velit ducimus ratione nam minima. Nihil est distinctio dicta mollitia nemo libero, facilis dolorem sint ea neque optio?</p>
        <div className='flex items-center justify-between ' >

          <button className='rounded-md transition-all px-2 py-1 bg-red-700 text-[whitesmoke] font-semibold hover:bg-red-600 ' >
            Delete
          </button>

           {/* <div className='flex items-center gap-3 ' >
                <Link to={"/user/69"} className='w-10 h-10 rounded-full max-md:w-6 max-md:h-6 bg-white' ></Link>
                <div className='tex-sm tracking-tight ' >username</div>
           </div>
           <div className=' flex gap-3 ' >
                <a href="/"><FaFacebook /> </a>
                <a href="/"><FaInstagram/></a>
                <a href="/"><FaXTwitter /></a>
            </div> */}

        </div>
    </Link>

  )
}

export default PostCard