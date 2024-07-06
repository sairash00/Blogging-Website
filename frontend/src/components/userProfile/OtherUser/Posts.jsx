import React from 'react'
import PostCard from './PostCard.jsx'
import './ProfileSection.css'

const Posts = () => {
  return (
    <div id='maindiv' className='w-full h-fit flex flex-wrap mt-10 gap-10 '>
        <PostCard />
        <PostCard />
        <PostCard />

    </div>
  )
}

export default Posts