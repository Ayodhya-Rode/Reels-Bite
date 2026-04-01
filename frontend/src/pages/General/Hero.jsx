import React from 'react'
import "../../styles/hero.css"
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1>
          Scroll. Watch. Crave. <br />
          <span>Order Instantly.</span>
        </h1>

        <p>
          Short food reels that make you hungry in seconds. 
          Discover trending dishes and order directly from food partners near you.
        </p>

        <div className="hero-actions">
            <Link to="/user/register">
              <button className="primary-btn">Explore Reels</button>
            </Link>
            <Link to="/food-partner/register">
              <button className="secondary-btn">Become Partner</button>
            </Link>
        </div>
      </div>

      <div className="hero-gradient-bottom" />
    </section>
  )
}

export default Hero