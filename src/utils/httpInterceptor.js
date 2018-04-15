import axios from 'axios';

axios.interceptors.request.use(
  function(config) {
    config.headers = { 'x-request-id': process.env.MSA_COMMON_AUTH_KEY };

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
