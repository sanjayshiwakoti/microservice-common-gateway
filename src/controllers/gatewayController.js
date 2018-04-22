import { Router } from 'express';
import HttpStatus from 'http-status-codes';

const router = Router();

/**
 * GET /api
 */
router.all('*', (req, res, next) => {
  console.log(req.protocol, req.originalUrl, req.method);
  switch (req.method) {
    case 'GET':
      axios.get(`${req.clientGatewayURL}/${req.originalUrl}`).then(response => response.data);
      break;
    case 'POST':
      axios.post(`${req.clientGatewayURL}/${req.originalUrl}`, req.body).then(response => response.data);
      break;
    case 'PUT':
      axios.put(`${req.clientGatewayURL}/${req.originalUrl}`, req.body).then(response => response.data);
      break;
    case 'PATCH':
      axios.patch(`${req.clientGatewayURL}/${req.originalUrl}`, req.body).then(response => response.data);
      break;
    case 'DELETE':
      axios.delete(`${req.clientGatewayURL}/${req.originalUrl}`, req.body).then(response => response.data);
      break;
    default:
      axios.get(`${req.clientGatewayURL}/${req.originalUrl}`).then(response => response.data);
      break;
  }
});

export default router;
