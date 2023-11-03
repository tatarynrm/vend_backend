const express = require("express");

const { createCheckout, liqpayCallback } = require("../../controllers/liqpay");
const router = express.Router();

router.route("/create-payment").post(createCheckout);
router.route("/callback").post(liqpayCallback);
module.exports = router;
