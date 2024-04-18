import * as billingController from "../controller/billingController/BillingController.js";

export const addCart = async (req, res) => {
  try {
    const resp = await billingController.addCart(req, res);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
