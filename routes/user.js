const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { getAllUsers, createNewUser } = require("../controllers/user");

const router = express.Router();

router.route('/').get(getAllUsers)
router.route('/new-user').post(checkAuth,createNewUser)

module.exports = router;