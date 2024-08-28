import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {Link, useNavigate } from "react-router-dom"
import './Navbar.css'
import axios from 'axios'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const navigate = useNavigate()
  const logout = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_lOGOUT)
      const data = response.data
      navigate("/login")
      

    } catch (error) {
      if(axios.isAxiosError(error)){
        return
      }else{
        return
      }
    }
  }

  return (
    <Disclosure as="nav" className="bg-transparent border-b border-[#224271] ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-[10vh] items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                   <Link to={"feeds/all"} className='text-3xl ' >Gigity ! </Link>
                </div>
              </div>

              {/* center Search */}

              <form>
                <div className=' px-2   border border-[#43438d] rounded-md transparent flex items-center gap-2 max-sm:sr-only ' >
                    <svg  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
                    <input className='bg-transparent outline-none  border-none text-[#fff] ' placeholder='Search' type="text" />
                </div>
              </form>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          to={"/profile/posts"}
                          className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Your Profile
                        </Link>
                      )}
                    </MenuItem>

                    {/* <MenuItem>
                      {({ focus }) => (
                        <a
                          href="#"
                          className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Settings
                        </a>
                      )}
                    </MenuItem> */}

                    <MenuItem>
                      {({ focus }) => (
                        <button
                        onClick={logout}
                        className={classNames(focus ? 'bg-gray-100' : '', ' w-full text-start block px-4 py-2 text-sm text-gray-700')}
                        >
                          Log Out
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>


          <DisclosurePanel id='hidingnav' className=" w-full bg-[#05193700] absolute  sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
                <Link to={"/feeds/all"} className ='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium' >
                    Home
                </Link>
                <Link to={"feeds/following"} className ='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium' >
                    Following
                </Link>
                <Link to={"feeds/followers"} className ='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium' >
                    Followers
                </Link>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
} 
