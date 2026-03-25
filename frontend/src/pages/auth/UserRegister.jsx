import "../../styles/theme.css";
import "../../styles/auth.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import api, { setAuthToken } from "../../api/api";

const UserRegister = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
  try {
    const res = await api.post(
      "/auth/user/register",
      data,
      { withCredentials: true } // cookie allow 
    );

    // Access token will return in response 
    const accessToken = res.data.accessToken;
    console.log("Access Token:", accessToken);

    // use access token for future authenticated requests
   
    setAuthToken(accessToken);
  } catch (err) {
    console.error("Registration error:", err);
  }
};


  return (
    <div className="auth-container">
      <div className="auth-right">
        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h1>Join Reels Bite</h1>
            <p>Create your profile and start sharing bites of fun</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name Field */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>

              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                required
                {...register("fullName")}
              />
               {errors.fullName && <span>Full name is required</span>}

            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                {...register("email")}
                required
              />
               {errors.email && <span>Email is required</span>}
            </div>

            {/* Phone Field */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phoneNumber"
                placeholder="0000000000"
                {...register("phoneNumber")}
                required
              />
               {errors.phoneNumber && <span>Phone number is required</span>}

            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                {...register("password")}
                required
              />
                {errors.password && <span>Password is required</span>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-submit">
              Create Account
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
