import express from "express";
import { CreateGuestUser } from "../../controller/guestController/GuestUserController.js";
const guestUserRoute = express.Router();

guestUserRoute.post("/register", CreateGuestUser);

export default guestUserRoute;
