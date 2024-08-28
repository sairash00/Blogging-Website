import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const PostCard = ({ data }) => {
  const [msg, setMsg] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // const deleteComment = async (e) => {
  //   e.stopPropagation();
  //   e.preventDefault()
  //   setLoading(true);
  //   try {
  //     const response = await axios.post(import.meta.env.VITE_DELETEPOST, { id: data._id });
  //     const responseData = response.data;
  //     if (responseData.success) {
  //       setDeleted(true);
  //     }
  //     setMsg(responseData.message);
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       setMsg(error.response.data.message);
  //     } else {
  //       setMsg("An unexpected error occurred");
  //     }
  //     setDeleted(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (deleted) {
    return null; // Hide the component if it has been deleted
  }

  return (
    <Link to={`/feeds/${data?._id}`} className='w-[45%] hover:border-[#4e71a5 ] rounded-md px-2 py-2 flex flex-col gap-3 justify-evenly max-md:w-full min-h-[20vh] border border-[#224271]'>
      <h1 className='text-xl text-[#d2d6de] font-bold max-sm:text-[1rem] tracking-wide'>{data?.title}</h1>
      <p className='text-sm text-[#9ca3af] tracking-wide truncate'>{data?.content}</p>
      <div className='flex items-center justify-between'>
        {/* <button onClick={deleteComment} className='rounded-md transition-all px-2 py-1 bg-red-700 text-[whitesmoke] font-semibold hover:bg-red-600' disabled={loading}>
          {loading ?<div className='w-6 h-6 rounded-full border-b animate-spin ' ></div> : 'Delete'}
        </button> */}
      </div>
      {msg && <p className='text-red-500'>{msg}</p>}
    </Link>
  );
};

export default PostCard;
