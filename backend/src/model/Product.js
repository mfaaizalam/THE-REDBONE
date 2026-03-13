import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;