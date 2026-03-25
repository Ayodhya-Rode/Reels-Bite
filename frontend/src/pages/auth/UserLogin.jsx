
import '../../styles/theme.css'
import '../../styles/auth.css'
import { Link } from 'react-router-dom'

const UserLogin = () => {


  return (
    <div className="auth-container">
      <div className="auth-right">
        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
             
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
            Don't have an account?
            <Link to="/user/register" style={{ color: 'var(--primary-color)', textDecoration: 'none', marginLeft: '5px' }}>Create one</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
