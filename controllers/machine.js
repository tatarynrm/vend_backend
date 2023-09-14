const db = require("../db/db");

const getMyMachine = async (req, res) => {
  const { company_id } = req.body;
  console.log(company_id);
  console.log(company_id);
  try {
    const result = await db.query(
      `select * from water_machine where company_id = ${company_id}`
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

  const client = await db.connect();
  try {
    const machine = await client.query(
      `select * from water_machine where machine_id = ${machine_id}`
    );

    // console.log(machine.rows);
    if (machine.rows[0]) {
      res.status(201).json({
        message: "User already exist",
      });
    } else {
      const newMachine = await client.query(
        `
         INSERT INTO water_machine (machine_id,address,company_id,machine_phone,terminal_sim,machine_pin)
         values (${+machine_id},'${address}',${
          company_id ? company_id : null
        },${machine_phone ? machine_phone : null},${
          terminal_sim ? +terminal_sim : null
        },${machine_pin ? +machine_pin : null})
         `
      );
      console.log(newMachine);
      res.status(200).json(newMachine.command);
    }
  } catch (error) {
    console.log(error);
  }
};
const editMachine = async (req, res) => {
  const { machine_id, address, machine_phone, terminal_sim, machine_pin } =
    req.body;
  console.log(terminal_sim);
  try {
    const client = await db.connect();
    const result = await client.query(
      `update water_machine set machine_id =${+machine_id},address ='${address}',
      machine_phone ='${machine_phone}',terminal_sim = '${
        terminal_sim !== null ? terminal_sim : 0
      }',machine_pin = ${+machine_pin} where machine_id =${+machine_id}
      `
    );
    res.status(200).json({
      msg: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteMachine = async (req, res) => {
  const { id } =
    req.body;

  try {
    const client = await db.connect();
    const result = await client.query(
      `delete from water_machine where machine_id = ${+id}
      `
    );
    res.status(200).json({
      msg: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getMyMachine,
  getAllMachines,
  createNewMachine,
  editMachine,
  deleteMachine
};
