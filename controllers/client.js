const db = require('../db/db')

const getAllCompanies = async (req,res)=>{
    try {
        const result = await db.query(`select * from public.company`)

        res.status(200).json(result.rows)
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getAllCompanies
}