require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8800; // Port number you want to use
const moment = require("moment");
const db = require("./db/db");
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const authRouter = require("./routes/auth");
const msgRouter = require("./routes/sendMessage.js");
const userRouter = require("./routes/user");
const clientRouter = require("./routes/client");
const machineRouter = require("./routes/machine");
const companyRouter = require("./routes/company");
const smsRouter = require("./routes/smsStatus");
const { default: axios } = require("axios");
app.use(express.static(path.join(__dirname, "client/build")));
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

const getButtonToPay = ()=>{
  const public_key = process.env.LIQPAY_PUBLIC_KEY;
  const private_key = process.env.LIQPAY_PRIVATE_KEY;
  const LiqPay = require("./my_modules/liqpay.js");
  const liqpay = new LiqPay(public_key, private_key);
  const html = liqpay.cnb_form({
    action: "pay",
    amount: "1",
    currency: "UAH",
    description: "Поповнення особистого кабінету vendmarket.space",
    order_id: uuidv4(),
    version: "3",
    result_url: "https://vendmarket.space",
    server_url: "https://api.vendmarket.space/callback",
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
  });
  console.log(html);
}
getButtonToPay()
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
app.post("/callback", (req, res) => {
  const data = req.body;
  // Process the callback data as needed (e.g., update your records)
  const jsonData = atob(data.data); // Decode base64
  const jsonSignature = atob(data.signature); // Decode base64
  const orderData = JSON.parse(jsonData);

  console.log('orderDATA',orderData);
  console.log("jsonSignature",jsonSignature);


  const orderId = orderData.order_id;


  console.log("Order ID: ", orderId);


  
  const urlEncodedText = encodeURIComponent(orderData.description);

// Decode the URL-encoded text to obtain the normal string
const decodedText = decodeURIComponent(urlEncodedText);

console.log(decodedText);

  // liqpay.api(
  //   "request",
  //   {
  //     action: "status",
  //     version: "3",
  //     order_id: orderId,
  //   },
  //   function (json) {
  //     console.log('JSON------',json.status);
  //   }
  // );
  // res.sendStatus(200);
});

// Serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
