import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Reset from './components/reset';
import Reset2 from './components/reset2';
import Active from './components/Active';
import Posts from './components/Posts';
import Post from './components/Posts/Post';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import News from './components/News';
import Admin from './components/Admin';
import PostCP from './components/Admin/postCP';
import UserCP from './components/Admin/userCP';
import Message from './components/Messages';
import MyProfile from './components/MyProfile';
import Footer from './components/Fot';
import NotFound from './components/NotFound';



import {
  ChakraProvider,
  Box,
  
  theme,
} from '@chakra-ui/react';

function App() {
  
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/posts" element={<Posts />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/active/:id" element={<Active />} />
            <Route exact path="/reset2/:id" element={<Reset2 />} />
            <Route exact path="/message/" element={<Message />} />
            <Route exact path="/post/:id" element={<Post />} />
            <Route exact path="/profile/:id" element={<Profile />} />
            <Route exact path="/news/" element={<News />} />
            <Route exact path="/admin/" element={<Admin />} />
            <Route exact path="/postCp/" element={<PostCP />} />
            <Route exact path="/userCp/" element={<UserCP />} />
            <Route exact path="/MyProfile/" element={<MyProfile />} />
            <Route exact path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      </Box>
    </ChakraProvider>
  );
}

export default App;
