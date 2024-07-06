

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Main from './components/Main/Main.jsx';
import Feed from './components/Feed/Feed.jsx';
import FeedsAll from './components/Feeds.sections/Feeds.all.jsx';
import FeedsFollowing from './components/Feeds.sections/Feeds.following.jsx';
import FeedsFollowers from './components/Feeds.sections/Feeds.followers.jsx';
import FeedsCreate from './components/Feeds.sections/Feeds.create.jsx';
import Profile from './components/userProfile/Profile.jsx';
import Posts from './components/userProfile/Posts.jsx';
import Followers from './components/userProfile/Followers.jsx';
import Following from './components/userProfile/Following.jsx';
// import Update from './components/userProfile/Update.jsx'
import OtherUser from './components/userProfile/OtherUser/OtherUser.jsx';
import DetailedFeed from './components/Feeds.sections/DetailedFeed.jsx';
import Comments from './components/Feeds.sections/Comments.jsx';
import Login from './components/registration/Login.jsx'
import Register from './components/registration/Register.jsx';

import axios from 'axios'
axios.defaults.withCredentials = true

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Main />}>
          <Route path='/feeds/:id' element={<DetailedFeed />} />
          <Route path='/feeds' element={<Feed />}>
            <Route path='/feeds/all' element={<FeedsAll />} />
            <Route path='/feeds/following' element={<FeedsFollowing />} />
            <Route path='/feeds/followers' element={<FeedsFollowers />} />
            <Route path='/feeds/create' element={<FeedsCreate />} />
          </Route>
          <Route path="/profile" element={<Profile />}>
            <Route path="/profile/posts" element={<Posts />} />
            <Route path="/profile/following" element={<Following />} />
            <Route path="/profile/followers" element={<Followers />} />
            {/* <Route path='update' element={<Update />} /> */}
          </Route>
          <Route path='/otherUser/:id' element={<OtherUser />}>
            <Route path="posts" element={<Posts />} />
            <Route path="following" element={<Following />} />
            <Route path="followers" element={<Followers />} />
          </Route>
          <Route path='/comment/:id' element={<Comments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
