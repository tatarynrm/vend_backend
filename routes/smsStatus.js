const express = require("express");
const {  getAllTodaySms, getSmsByDate } = require("../controllers/smsStatus");


const router = express.Router();
router.route('/').get(getAllTodaySms)
router.route('/by-date').post(getSmsByDate)

module.exports = router;