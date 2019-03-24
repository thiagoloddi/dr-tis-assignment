import mongoose from "mongoose";
import products from "./models/product.model";
import { MONGO_URL } from "../env";
import sales from "./models/sales.model";

const mongodb = async () => {

    mongoose.model('products', products);
    mongoose.model('sales', sales);

    mongoose.set('useFindAndModify', false);
    
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true });
}

export default mongodb;