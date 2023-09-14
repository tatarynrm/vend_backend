const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { sendMsgAddLitr, getToken, sendRestartModule, sendCollectCash, sendPriceForLitr } = require("../controllers/sendMessage");

const router = express.Router();
router.route('/').post(sendMsgAddLitr)
router.route('/module-restart').post(sendRestartModule)
router.route('/collect-cash').post(sendCollectCash)
router.route('/set-price').post(sendPriceForLitr)
module.exports = router;