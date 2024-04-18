import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    default: false,
  },
  sub_category: {
    type: String,
    default: false,
  },
  title: {
    type: String,
    allowNull: false,
  },
  price: {
    type: Number,
    allowNull: false,
  },
  discount_price: {
    type: Number,
    allowNull: false,
  },
  rating: {
    type: Number,
    allowNull: false,
  },

  image: {
    type: String,
  },
  imageAlt: {
    type: String,
    allowNull: false,
  },
  quantity: {
    type: Number,
    allowNull: false,
  },
  stock: {
    type: Number,
    allowNull: false,
  },
  availability: {
    type: String,
    allowNull: false,
  },
  size: {
    type: [String],
    allowNull: false,
  },
  brand: {
    type: String,
    allowNull: false,
  },
  pdetail: {
    type: String,
    allowNull: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
