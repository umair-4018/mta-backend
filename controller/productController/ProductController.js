import Product from "../../model/Product.js";

export const createProduct = async (req, res) => {
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
      return res.status(200).json({
        category: newProduct,
        code: 200,
        message: "Product Created Successfully",
      });
    } else {
      return res.status(400).json({
        code: 400,
        message: "Product does not Created Successfully",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Internal server error." });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const category = await Product.find();
    if (!category) {
      return res.status(404).json({
        code: 404,
        message: "Products not Found",
      });
    }
    return res.status(200).json({
      code: 200,
      message: "Products Found",
      category: category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      return res.status(200).json({
        code: 200,
        message: "Successfully Deleted Product",
        data: deletedProduct,
      });
    } else {
      return res.status(404).json({
        code: 404,
        message: "Product not Found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "Internal server error" });
  }
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

export const updateProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const existingProduct = await Product.findById(_id);

    if (!existingProduct) {
      return res.status(404).json({
        code: 404,
        message: "Product not found.",
      });
    }
    existingProduct.category = req.body.category || existingProduct.category;
    existingProduct.sub_category = req.body.sub_category || existingProduct.sub_category;
    existingProduct.title = req.body.title || existingProduct.title;
    existingProduct.price = req.body.price || existingProduct.price;
    existingProduct.discount_price = req.body.discount_price || existingProduct.discount_price;
    existingProduct.imageAlt = req.body.imageAlt || existingProduct.imageAlt;
    existingProduct.quantity = req.body.quantity || existingProduct.quantity;
    existingProduct.rating = req.body.rating || existingProduct.rating;
    existingProduct.stock = req.body.stock || existingProduct.stock;
    existingProduct.availability = req.body.availability || existingProduct.availability;
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
      return res.status(200).json({
        category: updatedProduct,
        code: 200,
        message: "Product Updated Successfully.",
      });
    } else {
      return res.status(400).json({
        code: 400,
        message: "Product not Updated Successfully.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error.",
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findOne({ _id });
    if (!product) {
      return res.status(404).json({
        code: 404,
        message: "Product not Found",
      });
    }
    return res.status(200).json({
      code: 200,
      message: "product Found",
      product: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
};
