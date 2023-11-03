require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8800; // Port number you want to use
const moment = require("moment");
const db = require("./db/db");
const cors = require("cors");
const path = require('path')

const authRouter = require("./routes/auth");
const msgRouter = require("./routes/sendMessage.js");
const userRouter = require("./routes/user");
const clientRouter = require("./routes/client");
const machineRouter = require("./routes/machine");
const companyRouter = require("./routes/company");
const smsRouter = require("./routes/smsStatus");
const { default: axios } = require("axios");
app.use(express.static(path.join(__dirname, 'client/build')));
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





const public_key = 'sandbox_i31110430124';
    const private_key = 'sandbox_HJjraXMdCLnz3ApcEJOYCjmSgRjhsjtuvFSVmVci';
    var LiqPay = require('./my_modules/liqpay.js');
    var liqpay = new LiqPay(public_key, private_key);
    var html = liqpay.cnb_form({
    'action'         : 'pay',
    'amount'         : '1',
    'currency'       : 'USD',
    'description'    : '312312321',
    'order_id'       : '32131413fwdfewf41343132',
    'version'        : '3',
    'result_url':'http:localhost:3000',
    'server_url':'https://api.vendmarket.space/callback'
    });

// app.post('/makePayment', async (req, res) => {
//   try {
//     // Configure your Liqpay API credentials
//     const public_key = 'sandbox_i31110430124';
//     const private_key = 'sandbox_HJjraXMdCLnz3ApcEJOYCjmSgRjhsjtuvFSVmVci';

//     // Define the payment data
//     const paymentData = {
//       action: 'pay',
//       amount: 1000, // Replace with the payment amount
//       currency: 'USD', // Replace with your preferred currency
//       description: 'Payment for Products', // Replace with your order description
//       order_id: '12345', // Replace with your order ID
//       version: 3,
//     };

//     // Generate a signature
//     const base64String = Buffer.from(JSON.stringify(paymentData)).toString('base64');
//     const signature = Buffer.from(private_key + base64String + private_key).toString('base64');

//     // Include the signature in the payment data
//     paymentData.data = base64String;
//     paymentData.signature = signature;

//     // Make a POST request to Liqpay to create a payment link
//     const response = await axios.post('https://www.liqpay.ua/api/3/checkout', paymentData);

//     // Send the payment URL to the client
//     console.log(response.data);
//     // res.json({ paymentUrl: response.data.data.url });
//     // res.json( response.data);
//     res.send(response.data)
//   } catch (error) {
//     console.error('Payment request error:', error);
//     res.status(500).send('Payment request failed.');
//   }
// });



















// Handle Liqpay callback (you need to set this URL in your Liqpay account settings)
app.post('/callback', (req, res) => {
  const data = req.body;
  // Process the callback data as needed (e.g., update your records)
  const jsonData = atob(data.data); // Decode base64
const orderData = JSON.parse(jsonData);

const orderId = orderData.order_id;
console.log("Order ID: ", orderId);
  liqpay.api("request", {
    "action"   : "status",
    "version"  : "3",
    "order_id" : orderId
    }, function( json ){
    console.log( json.status );
    });
  res.sendStatus(200);
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});





























app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
