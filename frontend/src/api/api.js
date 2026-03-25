import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // refresh token cookie allow
});

// to set access token in headers for authenticated requests
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Interceptor for auto-refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config; // 👈 define here

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // ekach attempt

      try {
        const res = await api.get("/auth/user/refresh-token", { withCredentials: true });
        const newAccessToken = res.data.accessToken;

        // set new access token in headers
        setAuthToken(newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // retry original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);

        // clear token and redirect
        setAuthToken(null);
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;