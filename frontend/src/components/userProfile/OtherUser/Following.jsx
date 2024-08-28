import React, {useState, useEffect} from 'react'
import FollowingCard from '../FollowingCard'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const OtherFollowing = () => {
  const params = useParams()
  const [data, setData] = useState()
  const [msg, setMsg] = useState()

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
        data?.following?.map((following) => (
          <FollowingCard key={following._id} following={following} initialIsFollowing={false} />
        ))
       }
    </div>
  )
}

export default OtherFollowing