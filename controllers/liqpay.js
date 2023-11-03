const LiqPay = require("../my_modules/liqpay");
const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");
const iconv = require('iconv-lite'); // You may need to install the 'iconv-lite' package via npm

const encodedString = "Ð\x9FÐ¾Ð¿Ð¾Ð²Ð½ÐµÐ½Ð½Ñ\x8F Ð¾Ñ\x81Ð¾Ð±Ð¸Ñ\x81Ñ\x82Ð¾Ð³Ð¾ ÐºÐ°Ð±Ñ\x96Ð½ÐµÑ\x82Ñ\x83 vendmarket.space";

const encodingsToTry = [
  'utf-8',
  'utf-16le',
  'utf-16be',
  'cp1251', // Windows-1251
  'cp866',  // IBM866
  'iso-8859-5',
  'koi8-r',
  'koi8-u',
  'iso-8859-1', // Latin-1
  'windows-1252', // Latin-1 (Windows)
];

let decodedString = '';

for (const encoding of encodingsToTry) {
  try {
    decodedString = iconv.decode(Buffer.from(encodedString, 'binary'), encoding);
    break;
  } catch (error) {
    console.log(`Decoding with ${encoding} failed: ${error}`);
  }
}

console.log(decodedString);


const stringEncodeFunc = (str) =>{
    let decodedString = '';
    for (const encoding of encodingsToTry) {
        try {
          decodedString = iconv.decode(Buffer.from(encodedString, 'binary'), encoding);
          break;
        } catch (error) {
          console.log(`Decoding with ${encoding} failed: ${error}`);
        }
      }
      return decodedString
}
// console.log(stringEncodeFunc(encodedString));



const liqpay = new LiqPay(
    process.env.LIQPAY_PUBLIC_KEY,
    process.env.LIQPAY_PRIVATE_KEY
  );
const createCheckout = async (req, res) => {
  const { amount, user_id,name,surname } = req.body;
  console.log(req.body);
  try {
    // const public_key = process.env.LIQPAY_PUBLIC_KEY;
    // const private_key = process.env.LIQPAY_PRIVATE_KEY;

    // const liqpay = new LiqPay(
    //     process.env.LIQPAY_PUBLIC_KEY,
    //     process.env.LIQPAY_PRIVATE_KEY
    //   );
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
      sender_first_name: name,
      sender_last_name: surname,
      info: "VENDMARKET PAY FOR WATER MACHINE",
      customer: +user_id,
    });
    res.json(html);
  } catch (error) {
    console.log(error);
  }
};
const liqpayCallback = async (req, res) => {

  try {
    const data = req.body;
    // Process the callback data as needed (e.g., update your records)
    const jsonData = atob(data.data); // Decode base64
    const jsonSignature = atob(data.signature); // Decode base64
    const orderData = JSON.parse(jsonData);
    const el = orderData;
    // console.log("orderDATA", orderData);
    // console.log("jsonSignature", jsonSignature);
    const orderId = orderData.order_id;
    // console.log(orderData?.user_id);
    // console.log("Order ID: ", orderId);
    // console.log('elllllllllllllllllll',el);
  const decodeUsername = Buffer.from(el.sender_first_name, 'utf-8').toString();
  const decodeUserLastname = Buffer.from(el.sender_last_name, 'utf-8').toString();
  let decodedName = stringEncodeFunc(el.sender_first_name)
  let decodedLastName = stringEncodeFunc(el.sender_last_name)
      // const text = `INSERT INTO client_pay (payment_id, user_id,status,info,amount,sender_name,sender_surname,sender_card_mask2,sender_card_bank,date)
      // VALUES ('${el.payment_id}','${el.user_id}','${el.status}','${el.info}','${el.amount}','${el.sender_name}','${el.sender_surname}','${el.sender_card_mask2}','${el.sender_card_bank}','${el.date}')
      //  `

      // Insert data with a parameterized query
    //   const result =
    //     await client.query(`INSERT INTO client_pay (payment_id, user_id,status,info,amount,sender_name,sender_surname,sender_card_mask2,sender_card_bank)
    //     VALUES (${el.payment_id},${el.user_id},'${el.status}','${el.info}',${el.amount},'${el.sender_name}','${el.sender_surname}','${el.sender_card_mask2}','${el.sender_card_bank}')
    //      `);
      const result =
        await db.query(`INSERT INTO client_pay (payment_id,amount,status,info,user_id,sender_name,sender_surname,sender_card_mask2,sender_card_bank)
        VALUES (${el.payment_id},${el.amount},'${el.status}','${el.info}',${el.customer},'${decodedName}','${decodedLastName}','${el.sender_card_mask2}','${el.sender_card_bank}')
         `);

      console.log("Data inserted successfully:", result);

  } catch (error) {
    console.log(error);
  } 
};
module.exports = {
  createCheckout,
  liqpayCallback,
};
