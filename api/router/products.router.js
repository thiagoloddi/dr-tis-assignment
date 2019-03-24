import express from 'express';
import mongoose from 'mongoose';
import * as products from '../controllers/products.controller';
import { handle } from './handler';

const createRouter = () => {
  const Products = mongoose.model('products');

  var router = express.Router();

  router.post("/", handle(Products.create));
  router.get("/", handle(Products.getAll));
  
  router.get("/:product_id", handle(Products.getOne));
  router.put("/:product_id", handle(Products.edit));
  router.delete("/:product_id", handle(Products.remove));

  return router;
}

export default createRouter;