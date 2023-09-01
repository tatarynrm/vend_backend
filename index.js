
require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 8800; // Port number you want to use
const db = require('./db/db')
const cors = require("cors");
const authRouter = require("./routes/auth");


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));



app.use("/auth", authRouter);

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

  // db.query(`insert into users (name,surname,tel,email,password)
  // values ('Роман','Татарин','+380989578520','tatarynrm@gmail.com','Aa527465182')
  // returning *;
  // `, (error,result) =>{
  //   if (error) {
  //     console.error('Error executing query', error);
  //   } else {
  //     console.log('Query result:', result.rows);
  //   }
  // })













  connectDB()
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
