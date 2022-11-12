import { ErrorRequestHandler } from 'express';

const error_handler: ErrorRequestHandler = (err, req, res, next) => {
  return res.status(500).json({ success: false, error: err.toString() });
};
export default error_handler;