import React,{useEffect, useState} from 'react'
import PostCard from './PostCard.jsx'
import '../ProfileSection.css'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const OtherPosts = () => {
  const params = useParams()
  const [msg, setMsg] = useState()
  const[data, setData] = useState()

  const getDetails = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_GETOTHERUSER, params)
      const data = response.data.user
      setData(data)
      setMsg(data.message)
    } catch (error) {
      if(axios.isAxiosError(error)){
        setMsg(error.response.data.message)
      }else{
        setMsg("An unexpected error occurred")
      }
    }
  }

  useEffect(() => {
    getDetails()
  },[])

  return (
    <div id='maindiv' className='w-full h-fit flex flex-wrap mt-10 gap-10 '>
        {data?.posts?.map((post)=>(
          <PostCard key={post._id} data ={post} />
        ))}
    </div>
  )
}

export default OtherPosts