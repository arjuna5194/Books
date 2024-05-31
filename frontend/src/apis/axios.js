import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
});
instance.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});
instance.interceptors.response.use(undefined, (err) => {
  if (err?.response?.status === 401) {
    localStorage.removeItem("token");
    window.location =
      window.location.protocol + "//" + window.location.host + "/login";
  }
  return Promise.reject(err);
});
export default instance;
