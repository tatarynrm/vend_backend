const db = require("../db/db");

const getMyMachine = async (req, res) => {
  const { company_id } = req.body;
  console.log(company_id);
  try {
    const result = await db.query(
      `select * from water_machine where company_id =${+company_id}`
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

  try {
    const machine = await db.query(
      `select * from water_machine where machine_id = ${machine_id}`
    );

    // console.log(machine.rows);
    if (machine.rows[0]) {
      res.status(201).json({
        message: "User already exist",
      });
    } else {
      const newMachine = await db.query(
        `
         INSERT INTO water_machine (machine_id,address,company_id,machine_phone,terminal_sim,machine_pin)
         values (${+machine_id},'${address}',${
          company_id ? company_id : null
        },${machine_phone ? machine_phone : null},${
          terminal_sim ? +terminal_sim : null
        },${machine_pin ? +machine_pin : null})
         `
      );

      res.status(200).json(newMachine.command);
    }
  } catch (error) {
    console.log(error);
  }
};
const editMachine = async (req, res) => {
  const {
    machine_id,
    address,
    machine_phone,
    terminal_sim,
    machine_pin,
    company_id,
  } = req.body;

  try {
    if (company_id === undefined) {
      const result = await db.query(
        `update water_machine set machine_id =${+machine_id},address ='${address}',
      machine_phone ='${machine_phone}',terminal_sim = '${
          terminal_sim !== null ? terminal_sim : 0
        }',machine_pin = ${+machine_pin} where machine_id =${+machine_id}
      `
      );
      res.status(200).json({
        msg: "Success",
      });
    } else {
      const result = await db.query(
        `update water_machine set machine_id =${+machine_id},address ='${address}',
      machine_phone ='${machine_phone}',terminal_sim = '${
          terminal_sim !== null ? terminal_sim : 0
        }',machine_pin = ${+machine_pin},company_id=${+company_id} where machine_id =${+machine_id}
      `
      );
      res.status(200).json({
        msg: "Success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteMachine = async (req, res) => {
  const { id } = req.body;

  try {
    const result = await db.query(
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
const changeAddress = async (req, res) => {
  const { id, address } = req.body;
  // console.log(req.body);
  try {
    const result = await db.query(
      `update water_machine set address ='${address}' where id =${+id}
    `
    );
    res.json({
      msg: "ok",
    });
  } catch (error) {
    console.log(error);
  }
};

// BALANCE FUNC

const machineBalanceUp = async (req, res) => {
  const { company_id, id } = req.body;
  console.log(company_id);
  try {
    const result = await db.query(
      `SELECT a.balance FROM company a WHERE a.id = ${company_id}`
    );
    if (result.rows[0].balance >= 100) {
      console.log("TRUE");
      const res1 = await db.query(`
      update water_machine 
      set month_balance = 100
      where id = ${id}
      RETURNING month_balance
      `);
      const decrementUserBalance = await db.query(`
      UPDATE company
      SET balance = balance - 100
      WHERE id = ${company_id}`);
      res.json(res1.rows[0].month_balance);
    } else {
      res.json({
        status: 400,
        msg: "Недостатньо коштів на балансі",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getMyMachine,
  getAllMachines,
  createNewMachine,
  editMachine,
  deleteMachine,
  changeAddress,
  machineBalanceUp,
};
