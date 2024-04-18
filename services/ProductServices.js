import * as productController from "../controller/productController/ProductController.js";
export const createProduct = async (req, res) => {
    try {
      const resp = await productController.createProduct(req, res);
      console.log(resp);
      res.json(resp);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
};
export const getAllProducts = async (req, res) => {
    try {
      const resp = await productController.getAllProducts(req, res);
      console.log(resp);
      res.json(resp);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
};
export const getAllProduct = async (req, res) => {
    try {
      const resp = await productController.getAllProducts(req, res);
      console.log(resp);
      res.json(resp);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
};
export const getSingleProduct = async (req, res) => {
    try {
      const resp = await productController.getSingleProduct(req, res);
      console.log(resp);
      res.json(resp);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
};
export const deleteProduct = async (req, res) => {
    try {
      const resp = await productController.deleteProduct(req, res);
      console.log(resp);
      res.json(resp);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
};
export const updateProduct = async (req, res) => {
    try {
      const resp = await productController.updateProduct(req, res);
      console.log(resp);
      res.json(resp);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
};