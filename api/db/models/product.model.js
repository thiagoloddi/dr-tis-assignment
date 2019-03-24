import { Schema } from "mongoose";
import * as controllers from "../../controllers/products.controller";

const productsModel = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true,  },
    stock: { type: Number, required: true },
});

productsModel.statics = controllers;

export default productsModel;