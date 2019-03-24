import express from "express";
import bodyParser from 'body-parser';
import productsRouter from "../api/router/products.router";
import salesRouter from '../api/router/sales.router';

export default () => {
  const app = express();
  
  app.use(bodyParser.json());
  app.use('/products', productsRouter());
  app.use('/sales', salesRouter());

  return app;
}