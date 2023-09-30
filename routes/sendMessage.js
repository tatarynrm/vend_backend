const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { sendMsgAddLitr, getToken, sendRestartModule, sendCollectCash, sendPriceForLitr, sendGetInfo, changePin, changeNumber, changeToken } = require("../controllers/sendMessage");

const router = express.Router();
router.route('/').post(sendMsgAddLitr)
router.route('/module-restart').post(sendRestartModule)
router.route('/collect-cash').post(sendCollectCash)
router.route('/set-price').post(sendPriceForLitr)
router.route('/get-info').post(sendGetInfo)
router.route('/change-pin').post(changePin)
router.route('/change-number').post(changeNumber)
router.route('/change-token').post(changeToken)
module.exports = router;