import axios from "axios";

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: "https://api-potluckplanner.herokuapp.com",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
};

export default axiosWithAuth;
