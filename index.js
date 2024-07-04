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
const LiqPayRouter = require('./routes/liqpay/liqpay')
const vendWaterSiteRouter = require('./routes/vendwaterController')
const axios = require("axios");
const cron = require('node-cron');
const { exec } = require('child_process');
const { testSchedule } = require("./own_functions/shedules.js");
const { creaeteQRCodeLiqPayDevice, createQRCodeLiqPay } = require("./controllers/liqpay.js");
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
app.use("/liqpay/", LiqPayRouter);
// Site
app.use("/site/", vendWaterSiteRouter);

app.get("/", (req, res) => {
  res.send("/");
});

// const blockUserBeforePay = async () => {
//   const begin = moment().format("DD-MM-YYYY");
//   const firstDay = begin.slice(0, 2);
//   // console.log(firstDay);
//   try {
//     if (firstDay === "03") {
//       const updateQuery = {
//         text: "UPDATE public.user SET active = $1  WHERE  role = 0",
//         values: [0], // Replace with your new values and the target row's identifier
//       };

//       db.query(updateQuery)
//         .then((result) => {
//           console.log("Update successful");
//         })
//         .catch((error) => {
//           console.error("Error executing update query", error);
//         });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// blockUserBeforePay();

// SCHEDULE WORK!!!!
testSchedule()
// SCHEDULE WORK!!!!

app.get('/current-time',async (req,res) =>{
 
  const date = new Date();
  try {
    console.log("Секунди: ", date.getSeconds()); // 0
    console.log("Хвилини: ", date.getMinutes()); // 51
    console.log("Години: ", date.getHours()); // 21
    console.log("Число місяця: ", date.getDate()); // 27
    console.log("Місяць: ", date.getMonth() + 1); // 10 (додаємо 1, щоб отримати місяць у форматі від 1 до 12)
    console.log("Рік: ", date.getFullYear()); // 2015
    const standardDay = date.getDay();
    const customDay = (standardDay + 6) % 7;
    // Для передачі значень на C можна створити об'єкт або рядок
    const time = {
        seconds: date.getSeconds(),
        minutes: date.getMinutes(),
        hours: date.getHours(),
        day: date.getDate(),
        month: date.getMonth() + 1, // Додаємо 1, оскільки JavaScript місяці нумеруються з 0
        year: date.getFullYear() - 2000,
        weekDay:customDay
    };
    
    // Вивід об'єкта для перевірки
    console.log("Часові параметри для C:", time.weekDay);

    res.send(`0=${time.seconds}&1=${time.minutes}&2=${time.hours}&3=${time.day}&4=${time.month}&5=${time.year}&6=${time.weekDay}`)
  } catch (error) {
    console.log(error);
  }
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
