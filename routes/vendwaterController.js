const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { getAllUsers, createNewUser, userUpdate, userDelete, cancelActiveFalse } = require("../controllers/user");
const { getAllMachinesPrice, changeMachineValues, getSiteContacts, changeNumber } = require("../controllers/vendwaterController");

const router = express.Router();

router.route('/').get(getAllMachinesPrice)
router.route('/update-machine').post(changeMachineValues)
router.route('/update-number').post(changeNumber)
router.route('/contacts').get(getSiteContacts)


module.exports = router;