import axios from 'axios';
import React,{useState}from 'react'
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';

const CommentBox = ({comment, onDelete }) => {

    
    const params = useParams()

    const deleteComment = async () =>{
        try {

            const response = await axios.post(import.meta.env.VITE_DELETECOMMENT,{commentId: comment._id, postId: params.id })
            const data = response.data

            if(data.success){
                onDelete(comment._id)
            }
            
        } catch (error) {
            if(axios.isAxiosError(error)){
                return
            }else{
                return
            }
        }
    }

  return (
    <div className='w-[45%] max-sm:w-full h-fit border flex flex-col gap-4 border-[#445978] rounded-md py-2 px-2 ' >

        <Link to={`/otherUser/${comment?.user?._id}/posts`} className='flex gap-4 items-center' >
            <div className='w-10 h-10 border rounded-full overflow-hidden ' ><img className='object-cover w-full h-full ' src={comment.user.avatar} alt="" /></div>
            <div className='text-sm text-[#cfcfcf]' > {comment.user.username || unknown} </div>
        </Link>

        <div className='w-full text-sm text-[#cfcfcf] ' >
            <p>{comment.content} </p>
        </div>

        <div className='flex justify-between' >
            <div className='flex gap-2' >
            {
                  comment.user?.links?.map((link,id) => (
                    <a key={id} className=' hover:text-gray-300 ' onClick={(e) =>e.stopPropagation() } href={link.link}>{
                      link.platform === "facebook" ?<FaFacebook />: link.platform === "instagram" ? <FaInstagram />: link.platform === "x" ? <FaXTwitter/> : null
                      }</a> 
                  ))
                }
            </div>
           {/* <button onClick={deleteComment} > <MdDeleteOutline className=' text-xl text-red-500 hover:text-red-600 transition-all  '  /></button> */}
        </div>

    </div>
  )
}

export default CommentBox