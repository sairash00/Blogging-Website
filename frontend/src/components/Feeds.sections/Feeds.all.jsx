import React,{useState, useEffect} from 'react'
import FeedsCard from './FeedsCard.jsx'
import './feedsSection.css'
import axios from 'axios'

const FeedsAll = () => {

  const [posts, setPosts] = useState([])
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(true)

  const getPosts = async() => {
      try {
        const response = await axios.get(import.meta.env.VITE_GETALLPOST)
        const data = await response.data.posts
        setPosts(data)
        setLoading(false)
      } catch (error) {
        if(axios.isAxiosError(error)){
        return setMsg(error.response?.data?.message)
      }
    }
  }

  useEffect(() =>{
    getPosts()
  },[])

  if(loading){
    return <div className='w-full h-[90vh] flex items-center justify-center ' >
      <div className='w-10 h-10 rounded-full border-b-2 animate-spin ' ></div>
    </div>
  }
  return (

    <div id='maindiv' className=' w-[100%] py-10 h-[90%] flex flex-wrap gap-4 overflow-y-auto'>
       
       {
        posts.map((post)=> (
          <FeedsCard key={post._id} post={post} />
        ))
       }
      
    </div>

  )
}

export default FeedsAll