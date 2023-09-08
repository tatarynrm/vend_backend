const { autoCommit } = require("oracledb");
const db = require("../db/db");

// ADMIN
const getAllCompanies = async (req, res) => {
  try {
    const company = await db.query(
      `select * from company`
    );
    console.log(users);
    res.status(200).json(company.rows);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
    getAllCompanies
};
