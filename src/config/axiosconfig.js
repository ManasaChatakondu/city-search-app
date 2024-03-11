import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://wft-geo-db.p.rapidapi.com',
    headers:{
        'X-RapidAPI-Key': 'cd938bca04msh814d4ed269045bep142a6fjsna65507731bfc',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
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