import React from 'react'
import "./feedsSection.css"
import { LuImage } from "react-icons/lu";

const FeedsCreate = () => {

  
  return (
    <div id='maindiv' className=' w-[100%] py-10 min-h-[90%] flex flex-col px-5 gap-6 overflow-y-auto'>
      <div>Share Your Experience</div>
      <form >
         <div className='' >
            <input type="text"  placeholder='Title goes here'  className='w-full px-2 h-[10vh] outline-none rounded-md bg-transparent border-[#224271] border '  />
         </div>

        <div>
          <textarea  placeholder='Content goes here'  className='w-full resize-none  h-[50vh] mt-5 px-2 outline-none rounded-md bg-transparent py-2 border-[#224271] border '  />
        </div>

        <div className='w-full h-[20vh] gap-3 mt-5 flex flex-col items-center justify-center border rounded-md border-[#224271] ' >
          <label htmlFor="file" className='text-[#9ca3af] ' > <LuImage /> </label>
          <label className='text-sm hover:underline underline-offset-4 text-[#9CA3AF] ' htmlFor="file">Upload your image</label>
          <input type="file" accept='image/*' id='file'  className='sr-only' />
        </div>

         <button className='  bg-red-800 transition-all rounded-md hover:bg-red-700 hover:text-[whitesmoke] text-sm  px-2 py-1 mt-5' type='submit' >Create</button>

      </form>
    </div>
  )
}

export default FeedsCreate