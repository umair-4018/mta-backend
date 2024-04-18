import {
  authLogin,
  authRegister,
  forgetPassword,
  getAllUsers,
  loginWithGoogle,
  removeUser,
  resetPassword,
  updateUser,
  fetchUserById,
} from "../../services/AuthServices.js";

import express from "express";
const authRoute = express.Router();

authRoute
  .post("/register", authRegister)
  .get("/get-users", getAllUsers)
  .get("/:id", fetchUserById)
  .delete("/remove-user/:id", removeUser)
  .patch("/update_user/:id", updateUser)
  .post("/login", authLogin)
  .post("/forgot_password", forgetPassword)
  .post("/reset_password", resetPassword)
  .post("/login_with_google", loginWithGoogle);
// .patch("/update_user/:id", updateUser);
export default authRoute;
