import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // refresh token cookie allow
});

// Access token सेट करण्यासाठी helper
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
    if (error.response && error.response.status === 401) {
      try {
        const res = await api.get("/auth/user/refresh-token");
        const newAccessToken = res.data.accessToken;

        // नवीन token सेट कर
        setAuthToken(newAccessToken);

        // मूळ request पुन्हा चालव
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(error.config);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        // logout किंवा redirect logic इथे
      }
    }
    return Promise.reject(error);
  }
);

export default api;