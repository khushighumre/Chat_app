

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import {Toaster} from "react-hot-toast"
import assets from './assets/assets.js';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';


const App = () => {
  const {authUser} = useContext(AuthContext)
  return (
    <div
      className="w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.bgImage})` }}
    >
      <Toaster/>
      <Routes>
        <Route path='/' element={authUser? <HomePage /> :<Navigate to="/login"/>} />
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/"/>} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/"/> } />
      </Routes>
    </div>
  );
};

export default App;

