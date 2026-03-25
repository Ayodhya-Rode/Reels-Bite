
import '../../styles/theme.css'
import '../../styles/auth.css'
import { Link } from 'react-router-dom'

const FoodPartnerRegister = () => {
  
  return (
    <div className="auth-container">
      <div className="auth-right">
        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h1>Expand Your Reach</h1>
            <p>Expand your reach by connecting with hungry customers</p>

          </div>

          <form className="auth-form" >
            {/* Restaurant Name */}
            <div className="form-group">
              <label htmlFor="restaurantName">Restaurant Name</label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                placeholder="Your Restaurant Name"
          
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@restaurant.com"
                required
              />
            </div>

            {/* Phone Field */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>

        {/* Address */}
            <div className="form-group">
              <label htmlFor="address">Restaurant Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="123 Main Street, City, State"
                required
              />
            </div>

           

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
              
                required
              />
            </div>



            {/* Submit Button */}
            <button type="submit" className="btn-submit">
              Register Restaurant
            </button>
          </form>

          {/* Divider */}
          {/* <div className="auth-divider">
            <span>or</span>
          </div> */}

          {/* Social Auth */}
          {/* <div className="social-auth">
            <button className="social-btn" title="Sign up with Google">
              🔵
            </button>
            <button className="social-btn" title="Sign up with Apple">
              🍎
            </button>
            <button className="social-btn" title="Sign up with Facebook">
              📘
            </button>
          </div> */}

          {/* Login Link */}
          <div className="auth-alternative">
            Already registered?
            <Link to="/food-partner/login" style={{ color: 'var(--primary-color)', textDecoration: 'none', marginLeft: '5px' }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodPartnerRegister
