import HttpStatus from 'http-status-codes';
import * as authService from '../services/authService';

const ROUTES_WITH_NO_AUTHORIZATION_KEY = ['/api/auth/login'];

export const authenticate = (req, res, next) => {
  if (!isAuthenticationRequired(req.url)) {
    return next();
  }

  let accessToken = req.get('Authorization');

  if (accessToken === null) {
    // TODO handle error
    res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Unauthorized' });
  }

  authService
    .authenticate(accessToken)
    .then(response => {
      req.clientGatewayURL = response.clientGatewayURL;
      next();
    })
    .catch(() => {
      // TODO handle error
      res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Unauthorized' });
    });
};

const isAuthenticationRequired = url => {
  return !ROUTES_WITH_NO_AUTHORIZATION_KEY.includes(url);
};
