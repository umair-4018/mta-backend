import Product from "../../model/Product.js";

export const createProduct = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newProduct = await Product.create({
        category: req.body.category,
        sub_category: req.body.sub_category,
        title: req.body.title,
        price: req.body.price,
        discount_price: req.body.discount_price,
        rating: req.body.rating,
        imageAlt: req.body.imageAlt,
        quantity: req.body.quantity,
        image: req.file?.path,
        stock: req.body.stock,
        availability: req.body.availability,
        size: req.body.size,
        brand: req.body.brand,
        pdetail: req.body.pdetail,
      });

      if (newProduct) {
        return resolve({
          category: newProduct,
          code: 200,
          message: "Product Created Successfully",
        });
      } else {
        return reject({
          code: 400,
          message: "Product does not Created Successfully",
        });
      }
      // }
    } catch (error) {
      console.log(error);
      return reject({ code: 500, message: "Internal server error." });
    }
  });
};
export const getAllProducts = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await Product.find();
      if (!category) {
        reject({
          code: 404,
          message: "Products not Found",
        });
      }
      resolve({
        code: 200,
        message: "Products Found",
        category: category,
      });
    } catch (error) {
      console.error(error);
      reject({ code: 500, message: "Internal server error" });
    }
  });
};
export const deleteProduct = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productId = req.params.id;
      // console.log(productId);
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (deletedProduct) {
        resolve({
          code: 200,
          message: "Successfully Deleted Product",
          data: deletedProduct,
        });
      } else {
        reject({
          code: 404,
          message: "Product not Found",
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
// export const updateCategory = async (req, res) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const _id = req.params.id;
//       // Check if the category with the given ID exists
//       const existingCategory = await Category.findById(_id);
//       if (!existingCategory) {
//         return reject({
//           code: 404,
//           message: "Category not found",
//         });
//       }
//       // Update the category fields based on the request body
//       existingCategory.name = req.body.name || existingCategory.name;
//       existingCategory.description =
//         req.body.description || existingCategory.description;
//       existingCategory.image =
//       req.file?.path|| existingCategory.image;
//       // Save the updated category
//       const updatedCategory = await existingCategory.save();
//       resolve({
//         code: 200,
//         message: "Category updated successfully",
//         category: updatedCategory,
//       });
//     } catch (error) {
//       console.error(error);
//       reject({
//         code: 500,
//         message: "Internal server error",
//       });
//     }
//   });
// };

export const updateProduct = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const _id = req.params.id;

      // Check if the category with the given ID exists
      const existingProduct = await Product.findById(_id);

      if (!existingProduct) {
        return reject({
          code: 404,
          message: "Product not found.",
        });
      }

      // Check if the name to update already exists (if provided)
      // if (req.body.name) {
      //   const checkName = await Product.findOne({
      //     name: req.body.name,
      //     _id: { $ne: _id }, // Exclude the current Product
      //   });

      //   if (checkName) {
      //     return reject({
      //       code: 400,
      //       message: "Product with the given name already exists.",
      //     });
      //   }
      // }

      // Update the category with the provided data
      existingProduct.category = req.body.category || existingProduct.category;
      existingProduct.sub_category =
        req.body.sub_category || existingProduct.sub_category;
      existingProduct.title = req.body.title || existingProduct.title;
      existingProduct.price = req.body.price || existingProduct.price;
      existingProduct.discount_price =
        req.body.discount_price || existingProduct.discount_price;
      existingProduct.imageAlt = req.body.imageAlt || existingProduct.imageAlt;
      existingProduct.quantity = req.body.quantity || existingProduct.quantity;
      existingProduct.rating = req.body.rating || existingProduct.rating;
      existingProduct.stock = req.body.stock || existingProduct.stock;
      existingProduct.availability =
        req.body.availability || existingProduct.availability;
      existingProduct.size = req.body.size || existingProduct.size;
      existingProduct.brand = req.body.brand || existingProduct.brand;
      existingProduct.pdetail = req.body.pdetail || existingProduct.pdetail;
      // Update image only if a new file is provided
      if (req.file) {
        existingProduct.image = req.file.path;
      }

      // Save the updated category

      const updatedProduct = await existingProduct.save();

      if (updatedProduct) {
        return resolve({
          category: updatedProduct,
          code: 200,
          message: "Product Updated Successfully.",
        });
      } else {
        return reject({
          code: 400,
          message: "Product not Updated Successfully.",
        });
      }
    } catch (error) {
      console.error(error);
      return reject({
        code: 500,
        message: "Internal server error.",
      });
    }
  });
};

export const getSingleProduct = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const _id = req.params.id;
      const product = await Product.findOne({ _id });
      if (!product) {
        reject({
          code: 404,
          message: "Product not Found",
        });
      }
      resolve({
        code: 200,
        message: "product Found",
        product: product,
      });
    } catch (error) {
      console.error(error);
      reject({ code: 500, message: "Internal server error" });
    }
  });
};
