import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: "https://thepotluckplanner.herokuapp.com/",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
};

export default axiosWithAuth;
