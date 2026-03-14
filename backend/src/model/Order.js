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
  customerName: String,
  phone: String,
  alternativePhone: String,
  email: String,
  city: String,
  landmark: String,
  address: String,
  deliveryInstructions: String,
  totalPrice: Number,
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;