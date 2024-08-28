import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar.jsx'

const Main = () => {
  return (
    <>
    <Navbar />
      <main className=' flex justify-center ' >
        <Outlet />
      </main>
    </>
  )
}

export default Main