import * as billingController from "../controller/billingController/BillingController.js";

export const addToCart = async (req, res) => {
  try {
    const resp = await billingController.addToCart(req, res);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
export const getAllItems = async (req, res) => {
  try {
    const resp = await billingController.getAllItems(req, res);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
export const getAllOrders = async (req, res) => {
  try {
    const resp = await billingController.getAllOrders(req, res);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

export const saveBilling = async (req, res) => {
  try {
    const resp = await billingController.saveBilling(req, res);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

export const stripePayment = async (req, res) => {
  try {
    const resp = await billingController.stripePayment(req, res);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
export const getItemById = async (req, res) => {
  try {
    const resp = await billingController.getItemById(req, res);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
// export const getItemByUserId = async (req, res) => {
//   try {
//     const resp = await billingController.getOrderByUserId(req, res);
//     console.log(resp);
//     res.json(resp);
//   } catch (err) {
//     console.log(err);
//     res.json(err);
//   }
// };
