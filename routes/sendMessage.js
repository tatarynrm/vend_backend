const express = require("express");
const checkAuth = require("../middleware/checkAuth");

const {
  sendMsgAddLitr,
  sendRestartModule,
  sendCollectCash,
  sendPriceForLitr,
  sendGetInfo,
  changePin,
  changeNumber,
  changeToken,
  changeAddress,
  changeServiceNumber,
} = require("../controllers/sendMessageWithKyivstar");

const router = express.Router();
// router.route("/").post(sendMsgAddLitr);












router.route("/").post(sendMsgAddLitr);
router.route("/module-restart").post(sendRestartModule);
router.route("/collect-cash").post(sendCollectCash);
router.route("/set-price").post(sendPriceForLitr);
router.route("/get-info").post(sendGetInfo);
router.route("/change-pin").post(changePin);
router.route("/change-token").post(changeToken);
router.route("/change-address").post(changeAddress);
router.route("/change-service-number").post(changeServiceNumber);
// Without sms sending
router.route("/change-number").post(changeNumber);
module.exports = router;
