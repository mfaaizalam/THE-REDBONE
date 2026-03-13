import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  city: String,
  area: String,
  customerName: String,
  phone: String,
  email: String,
  address: String,
  landmark: String,
  totalPrice: Number,
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;