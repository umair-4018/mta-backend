
import express from "express";
import { authLogin, authRegister, forgetPassword, getAllUsers, loginWithGoogle, removeUser, resetPassword, updateUser } from "../../controller/authController/AuthController.js";
const authRoute = express.Router();

authRoute
  .post("/register", authRegister)
  .get("/get-users", getAllUsers)
  .delete("/remove-user/:id", removeUser)
  .patch("/update_user/:id", updateUser)
  .post("/login", authLogin)
  .post("/forgot_password", forgetPassword)
  .post("/reset_password", resetPassword)
  .post("/login_with_google", loginWithGoogle);
// .patch("/update_user/:id", updateUser);
export default authRoute;
