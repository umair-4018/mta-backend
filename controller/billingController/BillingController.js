import Order from "../../model/Order.js";
import Item from "../../model/Item.js";
import Payment from "../../model/Payment.js";
import stripe from "stripe";

const stripeInstance = stripe(
  "sk_test_51OtqOwLBeP6j0c0JzWqAGMaTzC6s342EQYcYnNo9sCTyvFi752FQNptyoeSjLvLxqKghM1gLDnXX6VSToZjZ6CVm009HP8OG73"
);
export const addToCart = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const uId = req.details.id;

      const { productIds, subTotal, orderId } = req.body;
      if (orderId) {
        const existingOrder = await Item.findOne({ _id: orderId });
        if (!existingOrder) {
          return reject({ code: 400, message: "Order not found" });
        } else {
          // Update existing order with new product IDs
          existingOrder.productIds.push(...productIds); // Push new product IDs into the existing array
          existingOrder.subTotal = subTotal; // Update the subTotal
          const updatedOrder = await existingOrder.save();
          if (updatedOrder) {
            return resolve({
              code: 201,
              message: "Order updated successfully",
              order: updatedOrder,
            });
          } else {
            return reject({ code: 500, message: "Failed to update order" });
          }
        }
      }
      // Create a new order instance
      const newOrder = new Item({
        productIds: productIds, // Assign the array of product IDs
        subTotal: subTotal,
        // uId: uId,
      });
      const newItem = await newOrder.save();
      if (newItem) {
        return resolve({
          code: 201,
          message: "Order created successfully",
          order: newItem,
        });
      }
    } catch (error) {
      console.error(error);
      return reject({ code: 500, message: "Internal server error" });
    }
  });
};
export const getAllItems = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const orders = await Item.find().populate("uId");
      const orders = await Item.find().populate("productIds");
      console.log(orders, "hers is orderb is");
      return resolve({
        code: 200,
        order: orders,
        message: "successfully fetched data",
      });
    } catch (error) {
      console.error(error);
      return reject({ code: 500, message: "internal serval error" });
    }
  });
};
export const getItemById = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orderId = req.params.id;
      const order = await Item.findById(orderId).populate(
        "productIds.productId"
      );
      if (!order) {
        return reject({ code: 400, error: "Order not found" });
      }
      return resolve({ code: 200, order: order });
    } catch (error) {
      console.error(error);
      return reject({ code: 500, error: "Internal server error" });
    }
  });
};
// export const getOrderByUserId = async (req, res) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const { userId } = req.params;
//       const orders = await Order.find({ user: userId });
//       if (!order) {
//         return reject({ code: 400, error: "Order not found" });
//       }
//       return resolve({ code: 200, order: orders });
//     } catch (error) {
//       console.error(error);
//       return reject({ code: 500, error: "Internal server error" });
//     }
//   });
// };
export const saveBilling = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone,
      email,
      country,
      address,
      city,
      postal_code,
      // products,
      itemId,
      shipping,
      payment_method,
      guestname,
      guestUserEmail,
      guest_contact_info,
    } = req.body;

    console.log("here is req", req.body);
    const newBilling = new Order({
      first_name,
      last_name,
      phone,
      email,
      country,
      address,
      city,
      postal_code,
      // products,
      itemId,
      shipping,
      payment_method,
      guestname,
      guestUserEmail,
      guest_contact_info,
    });
    await newBilling.save();
    return {
      code: 201,
      message: "save data successully",
      order: newBilling,
    };
    //  res.status(201).json({ billing: savedBilling });
  } catch (error) {
    console.error(error);
    return { code: 500, message: "Internal server error" };
    // res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllOrders = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const orders = await Item.find().populate("uId");
      const orders = await Order.find().populate({
        path: "itemId",
        populate: {
          path: "productIds.productId",
          model: "Product", // Assuming 'Product' is the name of your product model
        },
      });
      console.log(orders, "hers is order is");
      return resolve({
        code: 200,
        order: orders,
        message: "successfully fetched data",
      });
    } catch (error) {
      console.error(error);
      return reject({ code: 500, message: "internal serval error" });
    }
  });
};

export const stripePayment = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    console.log("here is req body", req.body);
    try {
      const { product, token } = req.body;
      const uid = req.details.id;

      const price = product[0] ? product[0].price : null;
      console.log("here is price", price);
      const customer = await stripeInstance.customers.create({
        email: token.email,
        source: token.id,
      });

      const charge = await stripeInstance.charges.create({
        amount: price * 100,
        currency: "pkr",
        customer: customer.id,
      });
      console.log("amount is here", charge.amount);
      const payment = await Payment.create({
        amount: charge.amount,
        currency: charge.currency,
        customerId: charge.customer,
        uid: uid,
      });

      return resolve({
        code: 200,
        message: "Payment successful",
        result: payment,
      });
    } catch (error) {
      console.log("here is error", error);
      return reject({ code: 500, message: "internal server error" });
    }
  });
};
