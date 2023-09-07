const db = require('../db/db')

const getAllUsers = async (req,res)=>{
    try {
        const users = await db.query(`select * from public.user `)
// console.log(users);
        res.status(200).json(users.rows)
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getAllUsers
}