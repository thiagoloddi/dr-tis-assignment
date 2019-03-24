import mongoose from 'mongoose';

export const create = async product => {
  const Products = mongoose.model('products');

  try {
    const data = await Products(product).save();
    return { status: 200, data };
  } catch(e) {
    return { status: 500, data: e };
  }
}

export const getAll = async () => {
  const Products = mongoose.model('products');
  
  try {
    const data = await Products.find();
    return { status: 200, data };
  } catch(e) {
    return { status: 500, data: e };
  }
}

export const getOne = async ({ product_id }) => {
  const Products = mongoose.model('products');

  try {
    const data = await Products.findOne({ _id: product_id }, {}, { lean: true });

    if(data) {
      return { status: 200, data };
    } else {
      return { status: 500, data: 'Product Not Found' };
    }
  } catch(e) {
    return { status: 500, data: e };
  }
}

export const edit = async ({ product_id }, body) => {
  const Products = mongoose.model('products');

  try {
    const data = await Products.findOneAndUpdate({ _id: product_id }, body, { new: true, lean: true });
    return { status: 200, data };
  } catch(e) {
    return { status: 500, data: e };
  }
}

export const remove = async ({ product_id }) => {
  const Products = mongoose.model('products');

  try {
    await Products.findOneAndDelete({ _id: product_id });
    return { status: 200 };
  } catch(e) {
    return { status: 500, data: e };
  }
}