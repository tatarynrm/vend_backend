const db = require("../db/db");

const getMyMachine = async (req, res) => {
  const { company_id } = req.body;
  console.log(company_id);
  try {
    const result = await db.query(
      `select * from water_machine where company_id = 1`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
  }
};

// ADMIN
const getAllMachines = async (req, res) => {
  try {
    // const result = await db.query(`select * from water_machine`);
    const result = await db.query(
      `select * from water_machine a full outer join company b on a.company_id = b.id`
    );

    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const createNewMachine = async (req, res) => {
  const {
    machine_id,
    address,
    company_id,
    machine_phone,
    terminal_sim,
    machine_pin,
  } = req.body;
  console.log(req.body);
  const client = await db.connect();
  try {
    
    const machine = await client.query(
      `select * from water_machine where machine_id = ${machine_id}`
    );

    console.log(machine.rows);
    if (machine.rows[0]) {
      res.status(201).json({
        message: "User already exist",
      });
    } else {
      const newMachine = await client.query(
        `
         INSERT INTO water_machine (machine_id,address,company_id,machine_phone,terminal_sim,machine_pin)
         values (${+ machine_id},'${address}',${+ company_id},${ + machine_phone},${+ terminal_sim},${+ machine_pin})
         `
      );
      console.log(newMachine);
      res.status(200).json(newMachine.command);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getMyMachine,
  getAllMachines,
  createNewMachine
};
