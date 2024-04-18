import express from "express";
import { CreateGuestUser } from "../../services/GuestUserServices.js";
const guestUserRoute = express.Router();

guestUserRoute.post("/register", CreateGuestUser);

export default guestUserRoute;
