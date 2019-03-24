import mongodb from '../api/db';
import mongoose from 'mongoose';
import faker from 'faker';

mongodb()
  .then(async () => {
    const Products = mongoose.model('products');
    const Sales = mongoose.model('sales');

    console.log('Creating Products...');

    await Products.deleteMany({});
    await Sales.deleteMany({});
    
    for(let i = 0; i < 20; i++) {
      await new Products({
        name:  faker.commerce.productName(),
        price: (Math.random() * 1E4).toFixed(2),
        stock: Math.floor(Math.random() * 10) + 1,
      }).save();
    }

    console.log('Done!');

    process.exit();
  });