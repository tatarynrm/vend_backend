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
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
