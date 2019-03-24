import express from 'express';
import mongoose from 'mongoose';

import { handle } from './handler';

const createRouter = () => {
  const Sales = mongoose.model('sales');
  const router = express.Router();

  router.post("/", handle(Sales.create));
  router.get("/", handle(Sales.getAll));
  
  router.get("/:sale_id", handle(Sales.getOne));
  router.put("/:sale_id", handle(Sales.edit));
  router.delete("/:sale_id", handle(Sales.remove));

  return router;
}

export default createRouter;