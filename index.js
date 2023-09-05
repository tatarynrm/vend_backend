
require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 8800; // Port number you want to use
const db = require('./db/db')
const cors = require("cors");
const authRouter = require("./routes/auth");
const msgRouter = require('./routes/sendMessage.js')


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());




app.use("/auth", authRouter);
app.use("/msg", msgRouter);

app.get('/', (req, res) => {
    res.send('Hello, VENDMARKET!');
  });
  
  // Define another route
  app.get('/about', (req, res) => {
    res.send('About Page');
  });
  app.get('/users', (req, res) => {
    res.send('USERS LIST');
  });
  // const connectDB = async ()=>{
  //   try {
  //     await db.connect()
   
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // db.query('SELECT * FROM users', (error, result) => {
  //   if (error) {
  //     console.error('Error executing query', error);
  //   } else {
  //     console.log('Query result:', result.rows);
  //   }
  // });



  // db.query(`select now() as now`, (error,result) =>{
  //   if (error) {
  //     console.error('Error executing query', error);
  //   } else {
  //     console.log('Query result:', result.rows);
  //   }
  // })

  db.query(`select a.name,b.company_code from public.user a join company b on a.company_id = 1;
  `, (error,result) =>{
    if (error) {
      console.error('Error executing query', error);
    } else {
      console.log('Query result:', result.rows);
    }
  })













  // connectDB()
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
