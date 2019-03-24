import mongoose from 'mongoose';
import _ from 'lodash';

export const create = async body => {
  const Sales = mongoose.model('sales');
  const Products = mongoose.model('products');

  if(!body.items || body.items.constructor !== Array || !body.items.length) {
    return { status: 500, data: "Key 'items' is required and must be a non-empty Array." };
  }

  try {
    const sale = { cpf: body.cpf, items: [] };
    
    for(let i = 0; i < body.items.length; i++) {
      const item = body.items[i];
      const product = await Products.findById(item.product);

      if(product) {
        product.stock -= item.quantity;
        sale.items.push({ product, quantity: item.quantity });
      }
    }

    const response = await Promise.all([
      new Sales(sale).save(),
      ...sale.items.map(item => item.product.save())
    ]);

    return { status: 200, data: response[0] };
  } catch(e) {
    return { status: 500, data: e };
  }
}

export const getAll = async () => {
  const Sales = mongoose.model('sales');

  try {
    const data = await Sales.find().populate('items.product');
    return { status: 200, data };
  } catch(e) {
    return { status: 500, data: e };
  }
}

export const getOne = async ({ sale_id }) => {
  const Sales = mongoose.model('sales');

  try {
    const data = await Sales.findById(sale_id).populate('items.product');
    return { status: 200, data };
  } catch(e) {
    return { status: 500, data: e };
  }
}

export const edit = async ({ sale_id }, body) => {
  const Sales = mongoose.model('sales');
  const Products = mongoose.model('products');

  if(body.items && (body.items.constructor !== Array || !body.items.length)) {
    return { status: 500, data: "Key 'items' must be a non-empty Array." };
  }

  try {
    const sale = await Sales.findById(sale_id).populate('items.product');

    for(let i = 0; i < sale.items.length; i++) {
      const item = sale.items[i];

      item.product.stock += item.quantity;
      await item.product.save();
    }

    sale.items = [];

    for(let i = 0; i < body.items.length; i++) {
      const item = body.items[i];

      const product = await Products.findById(item.product);

      if(product) {
        product.stock -= item.quantity
        await product.save();
        sale.items.push({ product, quantity: item.quantity });
      }
    }

    const data = await Sales.findOneAndUpdate({ _id: sale_id }, sale, { new: true });

    return { status: 200, data };
  } catch(e) {
    return { status: 500, data: e };
  }
}

export const remove = async ({ sale_id }) => {
  const Sales = mongoose.model('sales');

  try {
    const sale = await Sales.findOneAndRemove({ _id: sale_id }).populate('items.product');

    for(let i = 0; i < sale.items.length; i++) {
      const item = sale.items[i];

      item.product.stock += item.quantity;
      await item.product.save();
    }

    return { status: 200 };
  } catch(e) {
    return { status: 500, data: e };
  }
}