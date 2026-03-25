import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import Home from '../pages/General/Home'
import CreateFoodPost from '../pages/foodPartner/CreateFoodPost'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/feed" element={<Home />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/create-food-post" element={<CreateFoodPost />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
