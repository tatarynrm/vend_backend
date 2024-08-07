const LiqPay = require("../my_modules/liqpay");
const crypto = require('crypto')
const QRCode = require('qrcode');
const liqpay = new LiqPay(
  process.env.LIQPAY_PUBLIC_KEY,
  process.env.LIQPAY_PRIVATE_KEY
);
const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");
const iconv = require("iconv-lite"); // You may need to install the 'iconv-lite' package via npm

const encodingsToTry = [
  "utf-8",
  "utf-16le",
  "utf-16be",
  "cp1251", // Windows-1251
  "cp866", // IBM866
  "iso-8859-5",
  "koi8-r",
  "koi8-u",
  "iso-8859-1", // Latin-1
  "windows-1252", // Latin-1 (Windows)
];
const stringEncodeFunc = (str) => {
  let decodedString = "";
  for (const encoding of encodingsToTry) {
    try {
      decodedString = iconv.decode(Buffer.from(str, "binary"), encoding);
      break;
    } catch (error) {
      console.log(`Decoding with ${encoding} failed: ${error}`);
    }
  }
  return decodedString;
};
const createCheckout = async (req, res) => {
  const { amount, company_id, name, surname } = req.body;
  try {
    const html = liqpay.cnb_form({
      action: "pay",
      amount: amount,
      currency: "UAH",
      description: "Поповнення особистого кабінету vendmarket.space",
      order_id: uuidv4(),
      version: "3",
      result_url: "https://vendmarket.space/payment-success",
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
      customer: company_id,
    });
    res.json(html);
  } catch (error) {
    console.log(error);
  }
};
const liqpayCallback = async (req, res) => {
  try {
    const data = req.body;

    const jsonData = atob(data.data); // Decode base64
    const jsonSignature = atob(data.signature); // Decode base64
    const orderData = JSON.parse(jsonData);
    const orderId = orderData.order_id;
    const el = orderData;
    console.log(orderData);
    const existPay = db.query(
      `select * from client_pay where payment_id = ${el.payment_id}`
    );
    console.log("exist pay rows", existPay.rows);
    if (existPay.rows > 0) {
      return null;
    }

    if (el.status === 'success') {
      let decodedName = stringEncodeFunc(el.sender_first_name);
      let decodedLastName = stringEncodeFunc(el.sender_last_name);
      const result =
        await db.query(`INSERT INTO client_pay (payment_id,amount,status,info,company_id,sender_name,sender_surname,sender_card_mask2,sender_card_bank)
        VALUES (${el.payment_id},${el.amount},'${el.status}','${el.info}',${el.customer},'${decodedName}','${decodedLastName}','${el.sender_card_mask2}','${el.sender_card_bank}')
         `);
      const incrementBalanceToUser = await db.query(`
    UPDATE company
    SET balance = balance + ${el.amount}
    WHERE id = ${el.customer}`);
      console.log("Data inserted successfully:", result);
    }
    //    const res1 = await  liqpay.api("request", {
    //         "action"   : "status",
    //         "version"  : "3",
    //         "order_id" : orderId
    //         }, function( json ){
    //         console.log( json.status );
    //         });
  } catch (error) {
    console.log(error);
  }
};


// Дані для оплати
const params = {
  public_key: process.env.LIQPAY_PUBLIC_KEY,
  version: '3',
  action: 'pay',
  amount: '30', // Сума платежу
  currency: 'UAH', // Валюта платежу
  description: 'Оплата за воду', // Опис платежу
  order_id: 'device_123456', // Використовуйте ваш device_id
  sandbox: '1' // Увімкніть тестовий режим для перевірки (1 для sandbox, 0 для live)
};

// Функція для створення підпису LiqPay
function createLiqPaySignature(params) {
  const base64Params = Buffer.from(JSON.stringify(params)).toString('base64');
  const signature = crypto.createHash('sha1')
                          .update(process.env.LIQPAY_PRIVATE_KEY + base64Params + process.env.LIQPAY_PRIVATE_KEY)
                          .digest('base64');
  return signature;
}

// Формування підпису
const data = Buffer.from(JSON.stringify(params)).toString('base64');
const signature = createLiqPaySignature(params);

// Формуємо платіжне посилання
const liqpayLink = `https://www.liqpay.ua/api/3/checkout?data=${data}&signature=${signature}`;

// Генерація QR-коду
QRCode.toFile('./liqpay-qr.png', liqpayLink, {
  color: {
    dark: '#000000',  // Колір темних пікселів
    light: '#ffffff'  // Колір світлих пікселів
  },
  width: 300, // Ширина зображення QR-коду
}, (err) => {
  if (err) throw err;
  console.log('QR-код створено!');
});

console.log('Посилання на оплату через LiqPay:', liqpayLink);

module.exports = {
  createCheckout,
  liqpayCallback

};
