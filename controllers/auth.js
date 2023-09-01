const db = require('../db/db')
const jwt = require("jsonwebtoken");
const login = async(req,res) =>{
    const {email,password} = req.body;
 
    try {
        const result = await db.query(`select * from users where email = '${email}' and password = '${password}'`)
      
    if (result.rows.length > 0) {
        const token = jwt.sign(
            {
              email: result.rows[0].email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "30d",
            }
          );
        res.status(200).send({...result.rows[0],token})
    }else {
       res.status(400).send({
        error:"Error"
       })
    }
    } catch (error) {
        console.log(error);
    }
}

const getMe = async (req,res)=>{
    // console.log(req);
    try {
        const result = await db.query(`select * from users where email = '${req.userId}'`)
        console.log(result.rows);
        res.status(200).json({...result.rows[0]})
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    login,
    getMe
}