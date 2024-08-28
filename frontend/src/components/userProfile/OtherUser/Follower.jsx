import React,{useState, useEffect} from 'react'
import FollowCard from '../FollowCard'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const OtherFollowers = () => {

  
  const [msg, setMsg] = useState()
  const[data, setData] = useState()
  const params = useParams()

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
       {
        data?.followers?.map((follower) => (
          <FollowCard key={follower._id} follower={follower} initialIsFollowing={false} />
        ))
       }
    </div>
  )
}

export default OtherFollowers