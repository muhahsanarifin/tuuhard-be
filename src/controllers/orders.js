const db = require("../configs/postgre");

const customerModels = require("../models/customers");
const orderModels = require("../models/orders");
const historyModels = require("../models/history");
const total = require("../helpers/total");

module.exports = {
  create: async (req, res) => {

    // Create a client from the connection db
    const client = await db.connect();

    try {
      // Begin an order
      await client.query("BEGIN");

      // Customer
      const customer = await customerModels.create(req.body, client);

      // tot = total
      // Purchase total
      const tot = await total(req.body);

      // Order
      const order = await orderModels.create(
        req.userPayload,
        customer.rows[0],
        req.body,
        tot,
        client
      );

      console.log("Order section: ", order);

      // Order History
      const history = await historyModels.create(
        req.userPayload,
        customer.rows[0],
        order.rows[0],
        req.body,
        client
      );

      // Commit a order
      await client.query("COMMIT");

      // Release the client back to db
      client.release();

      res.status(201).json({
        data: {
          histories: history.rows,
          order_id: order.rows[0].id,
          customer_id: customer.rows[0].id,
        },
        msg: "Success create product order",
      });
    } catch (error) {
      // Rollback the order in case of any error
      await client.query("ROLLBACK");

      // Release the client back to db
      client.release();

      res.status(500).json({
        msg: "Internal server error",
      });
    }
  },
};
