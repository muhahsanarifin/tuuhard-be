const snap = require("../configs/midtransClientSnap");

module.exports = {
  create: (staff, customer, order ) => {

    return new Promise((resolve, reject) => {
      let parameter = {
        payment_type: ["qris", "bca_klikpay"],
        transaction_details: {
          order_id: order.no_order,
          gross_amount: order.total,
        },
        customer_detail: {
          first_name: customer.first_name,
          last_name: customer.last_name,
          email: customer.email,
          phone: customer.no_telp,
          billing_address: {
            first_name: staff.first_name,
            last_name: staff.last_name,
            email: staff.email,
            phone: staff.no_telp,
            address: "Jalan Sultan Hasanuddin No. 79",
            city: "Masamba",
            postal_code: "92961",
            country_code: "IDN",
          },
          qris: {
            acquirer: "gopay, shopee",
          },
        },
      };

      // Create transaction
      snap
        .createTransaction(parameter)
        .then((transaction) => {
          // Transaction token
          let transactionToken = transaction.token;
          console.log("transactionToken:", transactionToken);

          // Transaction redirect url
          let transactionRedirectUrl = transaction.redirect_url;
          console.log("transactionRedirectUrl:", transactionRedirectUrl);

          return resolve(transaction);
        })
        .catch((e) => {
          console.log("Error occured:", e.message);

          return reject(e.message);
        });
    });
  },
};
