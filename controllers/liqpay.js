const LiqPay = require("../my_modules/liqpay");
const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

const createCheckout = async (req, res) => {
  const { amount ,user_id} = req.body;
  console.log(user_id);
  try {
    const public_key = process.env.LIQPAY_PUBLIC_KEY;
    const private_key = process.env.LIQPAY_PRIVATE_KEY;

    const liqpay = new LiqPay(
      process.env.LIQPAY_PUBLIC_KEY,
      process.env.LIQPAY_PRIVATE_KEY
    );
    const html = liqpay.cnb_form({
      action: "pay",
      amount: amount,
      currency: "UAH",
      description: "Поповнення особистого кабінету vendmarket.space",
      order_id: uuidv4(),
      version: "3",
      result_url: "https://vendmarket.space",
      server_url: "https://api.vendmarket.space/liqpay/callback",
      rro_info: {
        items: [
          {
            amount: 2,
            price: 202,
            cost: 404,
            id: 123456,
          },
        ],
        delivery_emails: ["tatarynrm@gmail.com", "rt@ict.lviv.ua"],
      },
      sender_first_name: "Roman",
      sender_last_name: "Tataryn",
      info: "VENDMARKET PAY FOR WATER MACHINE",
      customer:+user_id
    });
    res.json(html);
  } catch (error) {
    console.log(error);
  }
};
const liqpayCallback = () => {
  try {
    const data = req.body;
    // Process the callback data as needed (e.g., update your records)
    const jsonData = atob(data.data); // Decode base64
    const jsonSignature = atob(data.signature); // Decode base64
    const orderData = JSON.parse(jsonData);
    console.log("orderDATA", orderData);
    console.log("jsonSignature", jsonSignature);
    const orderId = orderData.order_id;
    console.log(orderData?.user_id);
    console.log("Order ID: ", orderId);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createCheckout,
  liqpayCallback,
};
