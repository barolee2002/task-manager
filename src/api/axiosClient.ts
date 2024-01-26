// api/axiosClient.js

import axios from "axios";
import queryString from "query-string";
import { useNavigate } from "react-router";
// Cai dat config mac dinh cho http request
// Tham khao: `https://github.com/axios/axios#request-config`
// de xem chi tiet

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    console.log(error);
    
    const navigate = useNavigate();
    if (error.response.status === 403 || error.response.status === 401) {
      console.log("co nhay vao");
      navigate(`/sign-in`);
      return;
    }
    return Promise.reject(error);
  }
);

// Update base url
const updateAxiosBaseURL = (baseUrl: string) => {
  axiosClient.defaults.baseURL = baseUrl;
};

// Update access token
const updateAxiosAccessToken = (accessToken: string) => {
  axiosClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
};

// Remove access token
const removeAxiosAccessToken = () => {
  delete axiosClient.defaults.headers.common["Authorization"];
};
updateAxiosBaseURL("http://localhost:8080");

export { updateAxiosAccessToken, removeAxiosAccessToken, updateAxiosBaseURL };

export default axiosClient;
