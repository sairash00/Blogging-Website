
import { useState, useEffect } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import isLoggedIn from '../../utils/isLoggedIn'

export default function AddComment({open, setOpen}) {
    const params = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState()

    const checkLogin = async() => {
      const loggedIn = await isLoggedIn(navigate)
    }
    useEffect(() =>{
      if(open) checkLogin()
    }  ,[open])

    function close(){
        setOpen(false)
    }

    const [value, setValue] = useState({
      content: ""
    })
    const changeVal = (e) => {
      setValue({
        ...value,
        [e.target.name] : e.target.value
      })
    }

    const addComment = async(e) => {
      e.preventDefault()
      if(value.content === ""){
        return
      }

      try {

        const response = await axios.post(import.meta.env.VITE_CREATECOMMENT, {content: value.content, postId: params.id})
        const data = response.data
        setData(data)
     
      } catch (error) {
        if(axios.isAxiosError(error)){
          return
        }else{
          return
        }
      }

      setValue({
        content: ""
      })
    }

  return (
    <Dialog open={open} onClose={close} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-[#1a345a] bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10   w-screen overflow-y-auto">
        <div className="flex  min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-[#051937] text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >

            
              <form onSubmit={addComment} className='p-2' >
                    <div className='' >
                        <textarea required placeholder='Comment goes here' value={value.content} onChange={changeVal} name="content" className='w-full rounded-md bg-transparent border text-gray-400 border-[#476087] h-[20vh]  ' ></textarea>
                    </div>
                    <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="submit"
                          
                          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 transition-all sm:ml-3 sm:w-auto"
                        >
                          Add Comment
                        </button>
                        <button
                          type="button"
                          data-autofocus
                          onClick={close}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>
                    </div>
            </form>

          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
