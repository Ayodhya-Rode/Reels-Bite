
import '../../styles/theme.css'
import '../../styles/auth.css'
import { Link } from 'react-router-dom'

const FoodPartnerLogin = () => {
  

  return (
    <div className="auth-container">
      <div className="auth-right">
        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h1>Partner Portal</h1>
            <p>Sign in to manage your restaurant</p>
          </div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
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

            {/* Password Field */}
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

            {/* Remember Me & Forgot Password */}
            {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe" style={{ margin: 0 }}>
                  Remember me
                </label>
              </div>
              <a href="#forgot" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
                Forgot Password?
              </a>
            </div> */}

            {/* Submit Button */}
            <button type="submit" className="btn-submit">
              Sign In
            </button>
          </form>

          {/* Divider */}
          {/* <div className="auth-divider">
            <span>or</span>
          </div> */}

          {/* Social Auth */}
          {/* <div className="social-auth">
            <button className="social-btn" title="Sign in with Google">
              🔵
            </button>
            <button className="social-btn" title="Sign in with Apple">
              🍎
            </button>
            <button className="social-btn" title="Sign in with Facebook">
              📘
            </button>
          </div> */}

          {/* Register Link */}
          <div className="auth-alternative">
            Not registered yet?
            
            <Link to="/food-partner/register" style={{ color: 'var(--primary-color)', textDecoration: 'none', marginLeft: '5px' }}>
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodPartnerLogin
