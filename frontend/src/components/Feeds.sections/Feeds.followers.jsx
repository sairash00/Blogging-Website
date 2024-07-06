import React,{useState, useEffect} from 'react'
import FeedsCard from './FeedsCard.jsx'
import axios from 'axios'
import './feedsSection.css'


const FeedsFollowers = () => {

  const [data,setData] = useState()

  useEffect(() => {
     const getPosts =  async () => {
      try {

        const response = await axios.get(import.meta.env.VITE_GETFOLLOWERPOST)
        const data = response.data
        setData(data.posts)
        console.log(data)
        
      } catch (error) {
         if(axios.isAxiosError(error)){
          return
         }else{
          return
         }
      }
     }

     getPosts()
  }, [])

  return (
    <div id='maindiv' className=' w-[100%] py-10 h-[90%] flex flex-wrap gap-4 overflow-y-auto'>
          {
            data?.map((post)=> (
              <FeedsCard key={post.id} post={post} />
            ))  
       }
    </div>
  )
}

export default FeedsFollowers