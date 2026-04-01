
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import Home from '../pages/General/Home'
import CreateFoodPost from '../pages/foodPartner/CreateFoodPost'
import Profile from '../pages/foodPartner/Profile'
import Hero from '../pages/General/Hero'
import NotFound from '../pages/General/NotFound'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />     {/* public landing page, can show featured posts or a welcome message */}
        <Route path="/feed" element={<Home />} />     {/* only for authenticated users */}
        <Route path="/user/register" element={<UserRegister />} />  {/* public route to register a new user */}
        <Route path="/user/login" element={<UserLogin />} />  {/* public route to login an existing user */}
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />  {/* public route to register a new food partner */}
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />  {/* public route to login an existing food partner */}
        <Route path="/create-food-post" element={<CreateFoodPost />} />  {/* only for authenticated food partners */}
        <Route path="/food-partner/:id" element={<Profile />} />  {/* only for authenticated food partners */}
    <Route path="*" element={<NotFound/>} />  {/* catch-all route for 404 Not Found */}
      </Routes>
    </Router>
  )
}

export default AppRoutes
