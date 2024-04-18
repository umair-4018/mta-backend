import * as authController from "../controller/authController/AuthController.js";
export const authRegister = async (req, res) => {
  try {
    const resp = await authController.authRegister(req, res);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
export const authLogin = async (req, res) => {
  try {
    const resp = await authController.authLogin(req, res);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
export const forgetPassword = async (req, res) => {
  try {
    const resp = await authController.forgetPassword(req);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const resp = await authController.resetPassword(req);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
};
export const loginWithGoogle = async (req, res) => {
  try {
    const resp = await authController.loginWithGoogle(req);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
};
export const updateUser = async (req, res) => {
  try {
    const resp = await authController.updateUser(req);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const resp = await authController.getAllUsers(req, res);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
export const removeUser = async (req, res) => {
  try {
    const resp = await authController.removeUser(req, res);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
export const fetchUserById = async (req, res) => {
  try {
    const resp = await authController.fetchUserById(req, res);
    console.log(resp);
    res.json(resp);
  } catch (err) {
    res.json(err);
  }
};
