const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { getAllUsers } = require("../controllers/user");

const router = express.Router();

router.route('/').get(getAllUsers)

module.exports = router;