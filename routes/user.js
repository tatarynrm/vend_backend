const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { getAllUsers, createNewUser, userUpdate, userDelete } = require("../controllers/user");

const router = express.Router();

router.route('/').get(getAllUsers)
router.route('/new-user').post(checkAuth,createNewUser)
router.route(`/update`).post(userUpdate)
router.route(`/delete`).post(userDelete)

module.exports = router;