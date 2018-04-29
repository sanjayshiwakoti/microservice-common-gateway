import axios from 'axios';

export const authenticate = accessToken => {
  return axios.post(`${process.env.MSA_AUTH}/api/auth/authenticate`, { accessToken }).then(response => response.data);
};

export const login = (credentials) => {
  return axios.post(`${process.env.MSA_AUTH}/api/auth/login`, credentials).then(response => {
    return response.data
  });
};
