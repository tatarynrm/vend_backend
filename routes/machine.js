const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { getMyMachine, getAllMachines } = require("../controllers/machine");
const router = express.Router();

router.route("/").post(getMyMachine);
router.route("/all").get(getAllMachines);

module.exports = router;
