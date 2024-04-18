import mongoose from "mongoose";

// Define the sub-schema for order items
const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Assuming a reference to a Product model

  // Add other fields as needed
});
const OrderItem = mongoose.model("OrderItem", orderItemSchema);
export default OrderItem;
