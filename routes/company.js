const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { getAllCompanies } = require("../controllers/client");
const { createCompany } = require("../controllers/company");


const router = express.Router();

router.route('/').get(getAllCompanies)
router.route('/new-client').post(checkAuth,createCompany)


module.exports = router;