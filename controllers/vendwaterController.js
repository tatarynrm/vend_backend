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

const changeMachineValues = async (req,res)=>{
    const { id,price,title } = req.body;

  console.log(req.body);
    try {
      const result = await db.query('UPDATE vendwater_site SET machine_name = $1,machine_price = $2 WHERE id = $3', [title,price, id]);
      res.status(200).json({ message: 'Record updated successfully' });
    } catch (error) {
      console.error('Error updating record:', error);
      res.status(500).json({ error: 'An error occurred while updating record' });
    }
}
module.exports = {
    getAllMachinesPrice,
    changeMachineValues
};
