const { autoCommit } = require("oracledb");
const db = require("../db/db");

const getAllMachinesPrice = async (req, res) => {
  try {
    const result = await db.query(
      `select * from vendwater_site`
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
    getAllMachinesPrice
};
