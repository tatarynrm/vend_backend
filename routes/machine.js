const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { getMyMachine, getAllMachines, createNewMachine, editMachine, deleteMachine } = require("../controllers/machine");
const router = express.Router();

router.route("/").post(getMyMachine);
router.route("/all").get(getAllMachines);
router.route("/new-machine").post(createNewMachine);
router.route("/edit").post(editMachine);
router.route("/delete").post(deleteMachine);

module.exports = router;
