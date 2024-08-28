import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import CommentBox from './CommentBox';
import AddComment from './AddComment';

const Comments = () => {
  const params = useParams()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [noComments, setNoComments] = useState(true)

  useEffect(() => {

    const getComments = async() => {
      try {
        const response = await axios.get(import.meta.env.VITE_GETCOMMENT + params.id)
        const data = response.data.comments.comments
        setData(data)
        if(data.length > 0){
          setNoComments(false)
        }

      } catch (error) {
        if(axios.isAxiosError(error)){
          return
        }else{
          return
        }
      }
    }
   
    getComments()

  },[])

  const handleDeleteComment = (commentId) => {
    setData(data.filter(comment => comment._id !== commentId));
  };



  return (
    <div className='w-[80vw] h-[90vh] py-4 ' >

        <div className='w-full h-[5vh]   flex justify-between items-center ' >
           <button onClick= {() => navigate(-1)} className=' p-1 rounded-full border text-xl hover:bg-gray-600 transition-all ' ><IoMdArrowBack className='text-white' /></button>
          <button onClick={() =>setOpen(true)} title='Add Comment' className='p-1 rounded-full border hover:bg-gray-600 transition-all text-xl ' ><IoAdd className='text-white' /></button>
          <AddComment open ={open} setOpen={setOpen} />
        </div>

        { noComments ? <div className='w-full h-[90vh] flex py-4 items-center justify-center text-gray-600 '  > No comments yet. Be the first to comment! </div> :<div id='maindiv' className='w-full px-4 gap-y-4 flex flex-wrap justify-between overflow-y-auto h-[85vh] mt-10  ' >
          {data?.map((comment) =>(
            <CommentBox key={comment._id} comment ={comment} onDelete ={ handleDeleteComment } />
          ))}
        </div>}


    </div>
  )
}

export default Comments