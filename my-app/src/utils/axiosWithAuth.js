import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    baseURL: "https://buildweekpotluckplanner.herokuapp.com",
  });
};

export default axiosWithAuth;
