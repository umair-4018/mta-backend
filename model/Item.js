import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
  productIds: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    },
  ],
  subTotal: {
    type: Number,
  },
  // uId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: false,
  // },
  // status: { type: String, default: "pending" },
});
const Item = mongoose.model("Item", itemSchema);
export default Item;
