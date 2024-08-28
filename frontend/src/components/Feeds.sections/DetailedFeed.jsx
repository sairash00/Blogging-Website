import React ,{useState, useEffect} from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { FaFacebook, FaInstagram} from "react-icons/fa";
import {FaXTwitter} from 'react-icons/fa6'
import isLoggedIn from '../../utils/isLoggedIn';



const DetailedFeed = () => {
    const params = useParams();
    const navigate = useNavigate()
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(0)
    const [data, setData] = useState()
    const [loading, setLoading] =useState(true)
    const [commentLength, setCommentLength ] = useState(0)

    const getDetails = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_GETPOST + params.id)
        const data = response.data.post
        setData(data)
        setLikes(data.likes)
        data.comments.forEach(element => {
          setCommentLength((prev) => prev+1)
        });

        setLoading(false)
     
      } catch (error) {
        if(axios.isAxiosError(error)){
          return
        }else{
          return
        }
      }
    }

    useEffect(() => {
      getDetails()
    }, [])
    

     const like = async () => {
      const loggedIn = await isLoggedIn(navigate)
      try {
        const response = await axios.post(import.meta.env.VITE_LIKEPOST,{id:params.id})
        const data = response.data
        
        if(data.success){
          setLiked(true)
        }
        
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return
        }else{
          return
        }
    }
    }
    const unlike = async () => {
      try {
        const response = await axios.post(import.meta.env.VITE_UNLIKEPOST,{id:params.id})
        const data = response.data
        
        if(data.success){
          setLiked(false)
        }else{}
        
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return
        }else{
          return
        }
    }
    }
   
    const changeLike = () => {
      if(!liked){
        like()
        setLikes((prev) => prev+1)
      }else{
        unlike()
        setLikes((prev) => prev-1)
      }
    }
    (data)

    if(loading){
      return <div className='w-full h-[90vh] flex items-center justify-center ' >
      <div className='w-10 h-10 rounded-full border-b-2 animate-spin ' ></div>
      </div>
    }
  return (
    <div id='maindiv' className="w-[80vw] px-4 py-4 max-sm:w-full flex flex-col gap-5 overflow-y-auto h-[90vh]">
        <button onClick={() => navigate(-1)} className='border w-fit p-1 hover:bg-slate-700 transition-all rounded-full' >
            <IoMdArrowBack className=' text-xl text-[#cfcfcf] ' />
        </button>
        {data.images[0] ? <p className=' text-[0.8rem] text-[gray] ' >If the image is too small click it to open in new tab</p> : null}
        { data.images[0] ? <div className="w-full flex  border-b py-10 border-[#314d77] items-center justify-center">
            <a className='flex justify-center ' href={data.images[0]} target='_blank' >
                <img
                className="rounded w-[50%] h-[50%] "
                src={data.images[0]}
                alt="Sample Image"
                />
            </a>
          </div> : null }

        <div className='flex gap-10 mt-5 items-center ' >
            
              <div className='flex  items-center gap-2' >
                  <Link to={`/otherUser/${data?.author?._id}/posts`} className=' w-10 h-10 overflow-hidden rounded-full border ' >
                    <img className='object-cover w-full h-full  ' src={data.author.avatar} alt="" />
                  </Link>
                  <div className=' text-[#cfcfcf] ' >{data.author?.username || "unknown"} </div>     
              </div>

            <div className='flex items-center gap-4 ' >
                <div onClick={changeLike} className='flex gap-1' >
                    {liked ? <AiFillLike /> :<AiOutlineLike className=' text-white ' />}
                    <span className=' text-sm text-[#cfcfcf] ' >{likes}</span>
                </div>

                <Link to={`/comment/${params.id}`} className='flex gap-1' >
                    <FaRegComments className=' ' />
                    <span className=' text-sm text-[#cfcfcf] ' >
                            {commentLength}
                    </span>
                </Link>
            </div>

           <div className='flex gap-3' >
              {
                  data.author?.links?.map((link,id) => (
                    <a key={id} className=' hover:text-gray-300 ' onClick={(e) =>e.stopPropagation() } href={link.link}>{
                      link.platform === "facebook" ?<FaFacebook />: link.platform === "instagram" ? <FaInstagram />: link.platform === "x" ? <FaXTwitter/> : null
                      }</a> 
                  ))
                }
          </div>

            
        </div>

      <div className="w-full flex flex-col gap-6 text-justify min-h-[50vh] mt-5 ">
        <h1 className='text-3xl tracking-wide font-bold max-sm:text-xl text-[#cfcfcf] ' >
            {data.title}
        </h1>
        <p className='tracking-tight text-[#cfcfcf] ' >
              {data.content}
        </p>
       <div className='text-sm py-4  '>Thankyou for Reading...</div>
      </div>

    </div>
  );
};

export default DetailedFeed;
