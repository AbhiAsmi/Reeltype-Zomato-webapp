import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister';
import UserLogin from '../pages/auth/UserLogin';
import Home from '../pages/general/Home';
import FoodRegister from '../pages/auth/FoodRegister';
import FoodLogin from '../pages/auth/FoodLogin';
import CreateFood from '../pages/food/CreateFood';
import Profile from '../pages/food/Profile';
import HomePage from '../pages/general/HomePage';
import SaveFood from '../pages/food/SaveFood';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
               
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/reelfeed" element={<Home/>}/>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/user/food-register" element={<FoodRegister/>}/>
                <Route path="/user/food-login" element={<FoodLogin/>}/>
                <Route path="/food/create"  element={<CreateFood/>}/>
                <Route path="/foodpartner/profile/:id" element={<Profile/>} />
                <Route path='/food/savedfood/:id' element={<SaveFood/>}/>
            </Routes>
        </Router>
    )
}

export default AppRoutes