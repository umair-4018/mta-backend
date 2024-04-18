import multer from "multer";
import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../../services/ProductServices.js";
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.mimetype.startsWith("video/")
      ? ".mp4"
      : `.${file.originalname.split(".").pop()}`;
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});
const productsRoute = express.Router();

productsRoute
  .post(
    "/add",
    [
      function (req, res, next) {
        upload.single("image")(req, res, function (err) {
          if (err) {
            return res.status(400).send({ message: err.message });
          }
          next();
        });
      },
    ],
    createProduct
  )
  .get("/get-products", getAllProducts)
  .get("/get-product/:id", getSingleProduct)
  .delete("/delete/:id", deleteProduct)
  .put(
    "/update/:id",
    [
      function (req, res, next) {
        upload.single("image")(req, res, function (err) {
          if (err) {
            return res.status(400).send({ message: err.message });
          }
          next();
        });
      },
    ],
    updateProduct
  );
export default productsRoute;
