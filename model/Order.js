import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  first_name: {
    type: String,
    default: false,
  },
  last_name: {
    type: String,
    default: false,
  },
  phone: {
    type: String,
    allowNull: false,
  },
  email: {
    type: String,
    allowNull: false,
  },
  country: {
    type: String,
    allowNull: false,
  },
  address: {
    type: String,
    allowNull: false,
  },
  city: {
    type: String,
    allowNull: false,
  },
  country: {
    type: String,
    allowNull: false,
  },
  postal_code: {
    type: String,
    allowNull: false,
  },
  // products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  postal_code: {
    type: String,
    allowNull: false,
  },

  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  // guestUserId: { type: mongoose.Schema.Types.ObjectId, ref: "GuestUser" },

  guestname: {
    type: String,
    default: false,
  },

  guestUserEmail: {
    type: String,
    allowNull: false,
  },

  guest_contact_info: {
    type: String,
    allowNull: false,
  },

  shipping: {
    type: String,
    allowNull: false,
  },
  payment_method: {
    type: String,
    allowNull: false,
  },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
