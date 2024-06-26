import express from "express";
import authRoute from "./auth/auth.js";
// import verifyTokens from "../middleware/index.js";
import productsRoute from "./products/index.js";
import billingRoute from "./billing/index.js";
import guestUserRoute from "./guestUser/index.js";
const router = express.Router();
router.use("/auth", authRoute);
router.use("/product", productsRoute);
router.use("/billing", billingRoute);
router.use("/guestUser", guestUserRoute);
export default router;
