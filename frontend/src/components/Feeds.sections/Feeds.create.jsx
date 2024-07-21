import React, { useEffect, useState } from 'react'
import "./feedsSection.css"
import isLoggedIn from '../../utils/isLoggedIn';
import { LuImage } from "react-icons/lu";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const FeedsCreate = () => {
  const navigate = useNavigate()
  const[msg, setMsg] =useState("")
  const[disable, setDisable] = useState(false)
  const [loading, setLoading] = useState(false)
  const[data, setData] = useState({
    title: "",
    content: '',
  })

  const [image, setImage] = useState(null)

  useEffect(() =>{
    const checkLogin = async() => {
      const loggedIn = await isLoggedIn(navigate)
    }
    checkLogin()
  }  ,[])
 
  const handleImage = (e) => {
    setImage(
      e.target.files[0]
    )
    setDisable(true)
  }

  const handleInputChange = (e) => {
    setData({
      ...data,
       [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if(data.title === "" || data.content === ""){
      alert("All fields are required")
      return
    }

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    if (image) {
      formData.append('image', image)
    }

    try {

      const response = await axios.post(import.meta.env.VITE_CREATEPOST,formData)
      const data = response.data
      if(data.success){
        setLoading(false)
      }
      setMsg(response.data.message)
      
      
    } catch (error) {
      console.log(error)
      if(axios.isAxiosError(error)){
        return setMsg(error.response.data.message || "An unexpected error occurred")
      }else{
        return setMsg("An unexpected error occurred")
      }
    }

    setData({
      title: "",
      content: ""
    })
    setImage(null)
    setDisable(false)
  }
  
  return (
    <div id='maindiv' className=' w-[100%] py-10 min-h-[90%] flex flex-col px-5 gap-6 overflow-y-auto'>
      <div>Share Your Experience</div>
      <form onSubmit={handleSubmit} encType='multipart/form-data' >
         <div className='' >
            <input type="text" required onChange={handleInputChange} value={data.title} name='title' placeholder='Title goes here'  className='w-full px-2 h-[10vh] outline-none rounded-md bg-transparent border-[#224271] border '  />
         </div>

        <div>
          <textarea required   placeholder='Content goes here' name='content' onChange={handleInputChange} value={data.content}  className='w-full resize-none  h-[50vh] mt-5 px-2 outline-none rounded-md bg-transparent py-2 border-[#224271] border '  />
        </div>

        <div className='w-full min-h-[20vh] gap-3 mt-5 flex flex-col items-center justify-center border rounded-md border-[#224271] ' >
          <label htmlFor="file" className='text-[#9ca3af] ' > <LuImage /> </label>
          <label className='text-sm hover:underline underline-offset-4 text-[#9CA3AF] ' htmlFor="file">Upload your image</label>
          <input disabled = {disable} type="file" onChange={handleImage} accept='image/*' id='file'  className='sr-only' />
          <div className='text-[0.7rem] text-[#9ca3af] ' >{image?.name}</div>
        </div>

        <div className='text-sm text-gray-300 mt-5 ' >
          {loading ? "Uploading..." : msg}
        </div>

         <button type = "submit" className='  bg-red-800 transition-all rounded-md hover:bg-red-700 hover:text-[whitesmoke] text-sm  px-2 py-1 mt-5' >Create</button>

      </form>
    </div>
  )
}

export default FeedsCreate