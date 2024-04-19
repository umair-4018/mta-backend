import express from "express";
import verifyTokens from "../../middleware/index.js";
import { addToCart, getAllItems, getAllOrders, getItemById, saveBilling, stripePayment } from "../../controller/billingController/BillingController.js";
const billingRoute = express.Router();

billingRoute
  .post("/add-to-cart", addToCart)
  .get("/get-items", getAllItems)
  .get("/get-orders", getAllOrders)
  .post("/payment/create", verifyTokens, stripePayment)
  .post("/add", saveBilling)
  .get("/get-order/:id", getItemById);
// .post("/add-to-cart", verifyTokens, addToCart)
// .get("/user/:userId", getOrderByUserId);
export default billingRoute;
