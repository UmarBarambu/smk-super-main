import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  quantity: Number,
  image: String,
});

export default mongoose.model('Product', productSchema);
