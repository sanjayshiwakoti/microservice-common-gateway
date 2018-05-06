import axios from 'axios';
import { Router } from 'express';
import HttpStatus from 'http-status-codes';

const router = Router();

/**
 * GET /api
 */
router.all('*', (req, res, next) => {
  req.clientGatewayURL = process.env.MSA_AUTH;
  let request = null;

  switch (req.method) {
    case 'GET':
      request = axios.get(`${req.clientGatewayURL}${req.originalUrl}`);
      break;
    case 'POST':
      request = axios.post(`${req.clientGatewayURL}${req.originalUrl}`, req.body);
      break;
    case 'PUT':
      request = axios.put(`${req.clientGatewayURL}${req.originalUrl}`, req.body);
      break;
    case 'PATCH':
      request = axios.patch(`${req.clientGatewayURL}${req.originalUrl}`, req.body);
      break;
    case 'DELETE':
      request = axios.delete(`${req.clientGatewayURL}${req.originalUrl}`, req.body);
      break;
    default:
      request = axios.get(`${req.clientGatewayURL}${req.originalUrl}`);
      break;
  }

  request.then(response => {
    res.json({});
  });
});

export default router;
