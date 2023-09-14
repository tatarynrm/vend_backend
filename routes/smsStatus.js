const express = require("express");
const {  getAllTodaySms, getSmsByDate, getSmsByDateAndCompany } = require("../controllers/smsStatus");


const router = express.Router();
router.route('/').get(getAllTodaySms)
router.route('/by-date').post(getSmsByDate)
router.route('/by-date-company').post(getSmsByDateAndCompany)

module.exports = router;