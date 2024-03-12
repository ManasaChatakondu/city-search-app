import axios from 'axios';

const {REACT_APP_RAPIDAPI_URL, REACT_APP_RAPIDAPI_KEY, REACT_APP_RAPIDAPI_HOST} = process.env;
const axiosInstance = axios.create({
    baseURL:`${REACT_APP_RAPIDAPI_URL}`,
    headers:{
        'X-RapidAPI-Key': `${REACT_APP_RAPIDAPI_KEY}`,
        'X-RapidAPI-Host': `${REACT_APP_RAPIDAPI_HOST}`,
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default axiosInstance;











//https://blog.logrocket.com/using-axios-set-request-headers/