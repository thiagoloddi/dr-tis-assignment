import { Schema } from "mongoose";
import * as controllers from '../../controllers/sales.controller';

const salesModel = new Schema({
    cpf: { type: String, required: true },
    items: [{ 
      _id: false,
      quantity: { type: Number, required: true },
      product: { type: Schema.ObjectId, ref: 'products', required: true }
    }]
});

salesModel.statics = controllers;

export default salesModel;