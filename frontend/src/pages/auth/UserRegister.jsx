import "../../styles/theme.css";
import "../../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

const UserRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // const formData = new FormData()

      // formData.append("fullName", data.fullName)
      // formData.append("email", data.email)
      // formData.append("phoneNumber", data.phoneNumber)
      // formData.append("password", data.password)

      // // 🔥 file handling
      // formData.append("profilePic", data.profilePic[0])
      const res = await axios.post(`${API}/api/auth/user/register`, data, {
        withCredentials: true,
      });

      console.log("res data ", res.data);

      toast.success(res.data.message || "User registered successfully 🎉");

      // redirect after successful registration
      navigate("/feed");
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-right">
        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h1>Join Reels Bite</h1>
            <p>Create your profile and start sharing bites of fun !</p>

            <div className="auth-switch">
              <span>Switch as :</span>
              <NavLink
                to="/user/register"
                className={({ isActive }) =>
                  isActive ? "switch-link active" : "switch-link"
                }
              >
                User
              </NavLink>
              <span>·</span>
              <NavLink
                to="/food-partner/register"
                className={({ isActive }) =>
                  isActive ? "switch-link active" : "switch-link"
                }
              >
                Food Partner
              </NavLink>
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name Field */}

            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="John Doe"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <span className="error-message">{errors.fullName.message}</span>
              )}
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            {/* Phone Field */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="0000000000"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
              />
              {errors.phoneNumber && (
                <span className="error-message">
                  {errors.phoneNumber.message}
                </span>
              )}
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
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-submit">
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="auth-alternative">
            Already have an account?
            <Link
              to="/user/login"
              style={{
                color: "var(--primary-color)",
                textDecoration: "none",
                marginLeft: "5px",
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
