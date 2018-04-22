import axios from 'axios';

export const authenticate = accessToken => {
  return axios.post(`${process.env.MSA_AUTH}/auth/authenticate`, { accessToken }).then(response => response.data);
};
