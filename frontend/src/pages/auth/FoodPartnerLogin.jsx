import "../../styles/theme.css";
import "../../styles/auth.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FoodPartnerLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/food-partner/login",
        data,
        {
          withCredentials: true,
        },
      );

      console.log("res data ", res.data);
      toast.success(res.data.message || "Login successful ✅");

      navigate(`/food-partner/${res.data?.user?._id}`);
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.data?.message) {
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
            <h1>Partner Portal</h1>
            <p>Sign in to manage your restaurant</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@restaurant.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
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
            <Link
              to="/food-partner/register"
              style={{
                color: "var(--primary-color)",
                textDecoration: "none",
                marginLeft: "5px",
              }}
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
