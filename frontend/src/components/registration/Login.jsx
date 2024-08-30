import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from'axios'
export default function Login() {

    const navigate = useNavigate()
    const [checked, setChecked] = useState(false)
    const change = (e) => {
        setChecked(e.target.checked)
    }

    const [msg, setMsg] = useState("")
    const [data, setData] = useState({
      email: "",
      password: ""
    })

    const handleFormData = (e) => {
      setData({
        ...data,
        [e.target.name] : e.target.value
      })
    }

    const handleSubmit= async(e) => {
      e.preventDefault()

      if(!data.email || !data.password){
        return setMsg("All fields are required")
      }

      if(data.password && data.password.length < 8){
        return setMsg("Password must be at least 8 characters")
      }
      try {

        const response = await axios.post(import.meta.env.VITE_LOGIN, {data})
        const info = response.data
        if(info.success){
          navigate("/feeds/all")
        }
        
      } catch (error) {
        console.log(error)
        if(axios.isAxiosError(error)){
          return setMsg( error.response?.data?.message || "Something went wrong")
        }else{
          return setMsg("An unexpected error occurred")
        }
      }


      setMsg("")
      setData({
        email: "",
        password: ""
      })
    }

    const isLoggedIn = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_ISLOGGEDIN)
        const info = response.data
        if(info.loggedIn){
          navigate("/feeds/all")
        }
        
      } catch (error) {
        return
    }
  }
  useEffect(() => {   
     isLoggedIn()
    }
  ,[])



    return (
      <>
       
        <div className="flex min-h-full flex-1 flex-col justify-center  px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full flex flex-col  items-center sm:max-w-sm">
            <Link to={"/feeds/all"} className=" font-bold text-3xl "> Gigity ! </Link>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#dedede]  ">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-[whitesmoke] ">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleFormData}
                    value={data.email}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-[whitesmoke] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset bg-transparent focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-[whitesmoke] ">
                    Password
                  </label>
                
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type={checked ? "text" : "password"}
                    onChange={handleFormData}
                    value={data.password}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-[whitesmoke] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 bg-transparent     focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex gap-2  ">
                 <input onChange ={change} id="check" className="outline-none focus-none text-[#212121] " type="checkbox" />
                 <label className="text-sm" htmlFor="check">Show Password</label>
              </div>

                <div className=" text-red-500 text-sm tracking-tight " >
                  {msg}
                </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have account?{' '}
              <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    register now
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  