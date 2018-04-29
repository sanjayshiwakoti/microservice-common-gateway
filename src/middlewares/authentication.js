import HttpStatus from 'http-status-codes';
import * as authService from '../services/authService';

const ROUTES_WITH_NO_AUTHORIZATION_KEY = ['/api/auth/login'];

export const authenticate = (req, res, next) => {
  if (!isAuthenticationRequired(req.url)) {

    let credentials = {
      username: req.body.username,
      password: req.body.password,
      slug: req.body.slug
    };

   authService.login(credentials)
    .then(response => res.json(response.data) )
  } else {
    let accessToken = req.get('Authorization');

    if (accessToken === null) {
      // TODO handle error
      res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Unauthorized' });
    }

    authService
      .authenticate(accessToken)
      .then(response => {
        console.log(response)
        console.log(response.business_unit_id[0].businessUnitUrl)
        req.clientGatewayURL = response.business_unit_id[0].businessUnitUrl;  //TODO handle array data from url buid
        next();
      })
      .catch(() => {
        // TODO handle error
        res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Unauthorized' });
      });
  }


};

const isAuthenticationRequired = url => {
  return !ROUTES_WITH_NO_AUTHORIZATION_KEY.includes(url);
};
