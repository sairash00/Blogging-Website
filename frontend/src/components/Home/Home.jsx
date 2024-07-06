import React, { useEffect, useRef } from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Home = () => {
  const div = useRef()
  const span = useRef()
  const link = useRef()
  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from(div.current,{
      opacity: 0,
      // duration:0.5,
      delay: 0.3,
      ease: 'elastic.out(1, 0.2)',
      y:-50
    })
    tl.from(span.current,{
      opacity: 0,
      ease: 'elastic.out(1, 0.3)',
      y:-50
    })

    tl.from(link.current,{
      opacity: 0,
      ease: 'elastic.out(1, 0.3)',
      y:-50
    })
  })
  return (
    <div className='homeDiv'>
        <div className='centerDiv'>
            <div ref={div}>Gigity !</div>
            <span ref={span}>Where people share their experiences.</span>
            <Link ref={link} className='Link' to={"/feeds/all"}>Let's Go</Link>
        </div>
    </div>
  )
}

export default Home