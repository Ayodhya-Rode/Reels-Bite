import "../../styles/theme.css";
import "../../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const FoodPartnerRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const selectedAvatar = watch('partnerAvatar')
  const selectedFileName = selectedAvatar?.[0]?.name || ''

  const navigate = useNavigate();

  const onSubmit = async () => {

    const formData = new FormData()
    formData.append('restaurantName', watch('restaurantName'))
    formData.append('email', watch('email'))
    formData.append('phoneNumber', watch('phoneNumber'))
    formData.append('address', watch('address'))
    formData.append('password', watch('password'))
    formData.append('avatar', selectedAvatar[0])

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/food-partner/register",
        formData,
        {
          withCredentials: true,
        },
      );
      
      // redirect after successful registration
      navigate("/create-food-post");
      toast.success(
        res.data.message || "Restaurant registered successfully 🎉",
      );
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
            <h1>Expand Your Reach</h1>
            <p>Expand your reach by connecting with hungry customers</p>

            {/* Role Switch */}

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
            {/* Restaurant Name */}
            <div className="form-group">
              <label htmlFor="restaurantName">Restaurant Name</label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                placeholder="Your Restaurant Name"
                {...register("restaurantName", {
                  required: "Restaurant name is required",
                })}
              />
              {errors.restaurantName && (
                <span className="error-message">
                  {errors.restaurantName.message}
                </span>
              )}
            </div>

              <div className="form-group">
            <label htmlFor="videoFile">Upload Avatar</label>
            <div className={`file-upload ${errors.avatar ? 'file-upload-error' : ''}`}>
              <input
                id="avatarFile"
                name="avatar"
                type="file"
                accept="image/*"
                {...register('avatar', {
                  required: 'Please upload an avatar.',
                })}
              />
              <label htmlFor="avatarFile" className="file-upload-button">
                <span className="file-upload-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v12" />
                    <path d="M8 11l4 4 4-4" />
                    <path d="M5 19h14" />
                  </svg>
                </span>
                  <span className="file-upload-text">
                  {selectedFileName || 'Choose an image'}
                </span>
                <span className="file-upload-action">Browse</span>
              </label>
            </div>
            {errors.partnerAvatar && (
              <span className="error-message">{errors.partnerAvatar.message}</span>
            )}
          </div>
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

            {/* Phone Field */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1 (555) 000-0000"
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

            {/* Address */}
            <div className="form-group">
              <label htmlFor="address">Restaurant Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="123 Main Street, City, State"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <span className="error-message">{errors.address.message}</span>
              )}
            </div>

            {/* Password */}
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
            <Link
              to="/food-partner/login"
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

export default FoodPartnerRegister;
