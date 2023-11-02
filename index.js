require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8800; // Port number you want to use
const moment = require("moment");
const db = require("./db/db");
const cors = require("cors");

const authRouter = require("./routes/auth");
const msgRouter = require("./routes/sendMessage.js");
const userRouter = require("./routes/user");
const clientRouter = require("./routes/client");
const machineRouter = require("./routes/machine");
const companyRouter = require("./routes/company");
const smsRouter = require("./routes/smsStatus");
const { default: axios } = require("axios");

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use("/auth", authRouter);
app.use("/msg", msgRouter);
app.use("/user", userRouter);
app.use("/client", clientRouter);
app.use("/machine", machineRouter);
app.use("/client", companyRouter);
app.use("/sms", smsRouter);

app.get("/", (req, res) => {
  res.send("Hello, VENDMARKET!");
});

const blockUserBeforePay = async () => {
  const begin = moment().format("DD-MM-YYYY");
  const firstDay = begin.slice(0, 2);
  // console.log(firstDay);
  try {
    if (firstDay === "03") {
      const updateQuery = {
        text: "UPDATE public.user SET active = $1  WHERE  role = 0",
        values: [0], // Replace with your new values and the target row's identifier
      };

      db.query(updateQuery)
        .then((result) => {
          console.log("Update successful");
        })
        .catch((error) => {
          console.error("Error executing update query", error);
        });
    }
  } catch (error) {
    console.log(error);
  }
};
blockUserBeforePay();

const publicKey = 'sandbox_i31110430124';
const privateKey = 'sandbox_HJjraXMdCLnz3ApcEJOYCjmSgRjhsjtuvFSVmVci';

// Endpoint to initiate a payment
app.get('/initiate-payment', async (req, res) => {
  try {
    const order = {
      version: '3',
      public_key: publicKey,
      action: 'pay',
      amount: 100, // Amount in your currency
      currency: 'USD',
      description: 'Payment for a product',
      order_id: 'unique_order_id',
      email: 'customer@email.com', // Add the customer's email here
      product_id: 'product123', // Add the product ID here
      result_url: 'https://vendmarket.space/payment-success',
      server_url: 'https://api.vendmarket.space/callback',
    };

    const signature = Buffer.from(privateKey + JSON.stringify(order) + privateKey).toString('base64');

    order.signature = signature;

    // Send the order to Liqpay
    const response = await axios.post('https://www.liqpay.ua/api/3/checkout', order);

    // Redirect the user to the payment page
    res.redirect(response.data.checkout_url);
  } catch (error) {
    console.error(error);
    res.status(500).send('Payment initiation failed');
  }
});

// Endpoint to handle Liqpay callback
app.post('/callback', (req, res) => {
  const data = req.body;
  const signature = Buffer.from(privateKey + JSON.stringify(data) + privateKey).toString('base64');

  if (data.signature === signature) {
    // Payment is valid, update your database or perform necessary actions
    console.log('Payment is valid:', data);
  } else {
    // Payment is not valid, handle accordingly
    console.log('Invalid payment:', data);
  }

  // Respond to Liqpay callback
  res.send('OK');
});






























    
// const publicKey = 'sandbox_i31110430124';
// const privateKey = 'sandbox_HJjraXMdCLnz3ApcEJOYCjmSgRjhsjtuvFSVmVci';
// var LiqPay = require('./my_modules/liqpay.js');
// var liqpay = new LiqPay(publicKey, privateKey);
// var html = liqpay.cnb_form({
// 'action'         : 'pay',
// 'amount'         : '5',
// 'currency'       : 'UAH',
// 'description'    : 'Оплата SMS',
// 'order_id'       : 'eqwewqeqr3132dsaca324324',
// 'version'        : '3',
// "server_url":"http://localhost:8800/payment-callback"
// });
// console.log(html);

// const liqpayPublicKey = 'sandbox_i31110430124';
// const liqpayPrivateKey = 'sandbox_HJjraXMdCLnz3ApcEJOYCjmSgRjhsjtuvFSVmVci';
// app.post("/create-payment", async (req, res) => {
//   try {
//     const { amount, description, order_id } = req.body;
//     // Define the LiqPay API URL
//     const apiUrl = "https://www.liqpay.ua/api/3/checkout";

//     // Prepare the data for the LiqPay API request
//     const data = {
//       public_key: liqpayPublicKey,
//       action: "pay",
//       amount: amount,
//       currency: "USD", // Change to the desired currency
//       description: description,
//       order_id: order_id,
//     };

//     // Calculate the signature
//     const signature = Buffer.from(
//       Buffer.from(liqpayPrivateKey).toString("base64") + JSON.stringify(data)
//     ).toString("base64");

//     // Send the request to LiqPay API
//     const response = await axios.post(apiUrl, {
//       data: Buffer.from(JSON.stringify(data)).toString("base64"),
//       signature,
//     });
// console.log(response);
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error creating LiqPay payment:", error);
//     res.status(500).json({ error: "Payment creation failed" });
//   }
// });

// Endpoint to handle LiqPay payment callback notifications
// app.post("/payment-callback", (req, res) => {
//   // Handle the payment callback here
//   console.log("LiqPay payment callback:", req.body);

//   // Perform necessary actions based on the payment result

//   res.sendStatus(200);
// });
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
