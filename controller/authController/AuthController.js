import dotenv from "dotenv";
dotenv.config();
var secret = process.env.SECRET;
import randomstring from "randomstring";
import User from "../../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../helper/sendEmail.js";

export const authRegister = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await User.findOne({ email: req.body.email });

      if (check) {
        return reject({
          code: 400,
          message: "Email already exists.",
        });
      } else {
        let hashPassword = bcrypt.hashSync(req.body.password, 8);

        const newUser = await User.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hashPassword,
          token: req.body.token,
        });

        if (newUser) {
          return resolve({
            user: newUser,
            code: 200,
            message: "User Created Successfully",
          });
        } else {
          return reject({
            code: 400,
            message: "User does not Created Successfully",
          });
        }
      }
    } catch (error) {
      console.log(error);
      return reject({ code: 500, message: "Internal server error." });
    }
  });
};
//login
export const authLogin = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return reject({
          code: 400,
          message: "Incorrect email.",
        });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          secret,
          {
            expiresIn: "24h", // expires in 24 hours
          }
        );

        return resolve({
          code: 200,
          message: "Login Successfully.",
          token,
          userInfo: user,
        });
      } else {
        return reject({
          code: 400,
          message: "Incorrect password.",
        });
      }
    } catch (error) {
      console.error(error); // Use console.error for error logging
      return reject({ code: 500, message: "Internal server error." });
    }
  });
};
//forget password
export const forgetPassword = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const email = req.body.email;

      const user = await User.findOne({ email });

      if (user) {
        const randomToken = randomstring.generate();
        user.token = randomToken;
        await user.save();

        sendEmail(user.email, randomToken);

        return resolve({
          code: 200,
          user: user,
          message: "Please check your inbox.",
        });
      } else {
        return reject({
          code: 400,
          message: "Sorry, user does not exist.",
        });
      }
    } catch (error) {
      console.log(error);
      return reject({ code: 500, message: "Internal server error." });
    }
  });
};
//reset password
export const resetPassword = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = req.body.token;
      const user = await User.findOne({ token });

      if (!user) {
        return reject({
          code: 400,
          message: "Token does not exist.",
        });
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      user.password = hashedPassword;
      user.token = null; // Clear the token field
      await user.save();

      return resolve({
        code: 200,
        message: "Password updated successfully.",
      });
    } catch (error) {
      console.log(error);
      return reject({ code: 500, message: "Internal server error." });
    }
  });
};
//login with google
export const loginWithGoogle = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          secret,
          {
            expiresIn: 86400, // expires in 24 hours
          }
        );

        return resolve({
          code: 200,
          message: "Login Successfully.",
          token: token,
          userInfo: user,
        });
      } else {
        return reject({
          code: 400,
          message: "User does not exist.",
        });
      }
    } catch (error) {
      console.log(error);
      return reject({ code: 500, message: "Internal server error." });
    }
  });
};
export const getAllUsers = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await User.find().populate("shipAddress");
      if (!users) {
        reject({
          code: 404,
          message: "users not found",
        });
      }
      resolve({
        code: 200,
        message: "users found",
        users: users,
      });
    } catch (error) {
      console.error(error);
      reject({ code: 500, message: "Internal server error" });
    }
  });
};
export const removeUser = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userId = req.params.id; // Assuming you get the conversation ID from the request parameters
      const deletedUser = await User.findByIdAndDelete(userId);
      if (deletedUser) {
        resolve({
          code: 200,
          message: "Successfully deleted conversation",
          data: deletedUser,
        });
      } else {
        reject({
          code: 404,
          message: "Conversation not found",
        });
      }
    } catch (error) {
      console.error(error);
      reject({
        code: 500,
        message: "Internal server error",
      });
    }
  });
};
export const updateUser = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const _id = req.params.id;
      const { isActive } = req.body;
      const existingUser = await User.findOne({ _id });
      if (!existingUser) {
        return reject({
          code: 404,
          message: "User not found.",
        });
      }
      // Update only if the isActive field is provided in the request body
      if (isActive !== undefined) {
        existingUser.isActive = isActive;
      }
      // You can add more fields to update based on your requirements
      const updatedUser = await existingUser.save();
      return resolve({
        user: updatedUser,
        code: 200,
        message: "User updated successfully.",
      });
    } catch (error) {
      console.error(error);
      return reject({ code: 500, message: "Internal server error." });
    }
  });
};
