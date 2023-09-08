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
    const result = await db.query(`select * from water_machine a full outer join company b on a.company_id = b.id`);
   
   console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getMyMachine,
  getAllMachines
};
