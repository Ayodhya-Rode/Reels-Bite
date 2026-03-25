
import '../../styles/theme.css'
import '../../styles/auth.css'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import api, { setAuthToken } from "../../api/api";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const UserLogin = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

   const onSubmit = async (data) => {
  try {
    const res = await api.post(
      "/auth/user/login",
      data,
      { withCredentials: true } // cookie allow 
    );

    // Access token will return in response 
    const accessToken = res.data.accessToken;
       
    // use access token for future authenticated requests
    
    setAuthToken(accessToken);
    toast.success("Login successful ✅");

    navigate("/feed");

  } catch (err) {
    console.error("Login error:", err);
    if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Login failed. Please try again.");
    }
  }
};



  return (
    <div className="auth-container">
      <div className="auth-right">
        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
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
