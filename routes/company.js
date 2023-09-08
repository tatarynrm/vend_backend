const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { getAllCompanies } = require("../controllers/client");


const router = express.Router();

router.route('/').get(getAllCompanies)


module.exports = router;