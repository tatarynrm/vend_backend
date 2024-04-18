const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { getAllUsers, createNewUser, userUpdate, userDelete, cancelActiveFalse } = require("../controllers/user");
const { getAllMachinesPrice } = require("../controllers/vendwaterController");

const router = express.Router();

router.route('/').get(getAllMachinesPrice)


module.exports = router;