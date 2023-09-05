const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { sendMsgAddLitr } = require("../controllers/sendMessage");

const router = express.Router();
router.route('/').post(sendMsgAddLitr)
module.exports = router;