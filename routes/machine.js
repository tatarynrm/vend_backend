const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const { getMyMachine, getAllMachines, createNewMachine, editMachine, deleteMachine, machineBalanceUp, blockOrUnblockMachine, getOneMachine } = require("../controllers/machine");
const { changeAddress } = require("../controllers/machine");
const router = express.Router();

router.route("/").post(getMyMachine);
router.route("/all").get(getAllMachines);
router.route("/:id").get(getOneMachine);
router.route("/new-machine").post(createNewMachine);
router.route("/edit").post(editMachine);
router.route("/delete").post(deleteMachine);
router.route("/change-adress").post(changeAddress);

// BALANCE
router.route("/balance-up").post(machineBalanceUp);

// ADMIN FUNC
router.route("/block-machine").post(blockOrUnblockMachine);

module.exports = router;
