const db = require("../configs/postgre");

const userModels = require("../models/users");
const checkoutModels = require("../models/checkout");
const orderModels = require("../models/orders");
const customerModels = require("../models/customers");
const transactionModels = require("../models/transactions");

module.exports = {
  create: async (req, res) => {
    // Create a client from the connection db
    const client = await db.connect();

    try {
      // Begin checkout
      await client.query("BEGIN");

      // User
      const user = await userModels.retriveProfileStaff(
        req.userPayload,
        client
      );

      // Customer
      const customer = await customerModels.customerRecently(req.body);
      console.log("Customer: ", customer);

      // Order
      const order = await orderModels.orderRecently(req.body);
      console.log("Order recently: ", order);

      // Checkout
      const checkout = await checkoutModels.checkout(
        user.rows[0],
        customer.rows[0],
        order.rows[0]
      );

      // Transaction
      const transaction = await transactionModels.create(
        user.rows[0],
        customer.rows[0],
        order.rows[0],
        req.body,
        client
      );
      console.log("Transaction: ", transaction);

      // Commit checkout
      await client.query("COMMIT");

      // Release the client back to db
      client.release();

      res.status(201).json({
        data: checkout,
      });
    } catch (error) {
      // Rollback the checkout in case of any error
      client.query("ROLLBACK");

      // Release the client back to db
      client.release();

      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },
};
