import axios from 'axios';

export const authenticate = accessToken => {
  return axios.post(`${process.env.MSA_AUTH}/auth/authenticate`, { accessToken }).then(response => response.data);
};

export const login = (credentials) => {  
  return axios.post(`${process.env.MSA_AUTH}/auth/login`, credentials).then(response => {    
    return response.data
  });
};
