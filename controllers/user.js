const { autoCommit } = require("oracledb");
const db = require("../db/db");

const getAllUsers = async (req, res) => {
  try {
    const users = await db.query(
      `select * from public.user a full outer join company b on a.company_id = b.id `
    );
    console.log(users.rows);
    res.status(200).json(users.rows);
  } catch (error) {
    console.log(error);
  }
};

// ADMIN
const createNewUser = async (req, res) => {
  const { name, surname, last_surname, email, password, tel, company_id } =
    req.body;
  const client = await db.connect();
  try {
    const user = await client.query(`select * from public.user where email = '${email}'`)
   
   console.log(user.rows);
   if (user.rows[0]) {
    res.status(201).json({
        message:"User already exist"
    })
   }else {
    const newUser = await client.query(
      `
        INSERT INTO public.user (name,surname,last_surname,email,password,tel,company_id)
        values ('${name}','${surname}','${last_surname}','${email}','${password}','${tel}','${company_id}')
        `
    );
    console.log(newUser);
    res.status(200).json(newUser.command);
   }

  } catch (error) {
    console.log(error);
    res.status(400).json(error)
  }
};
module.exports = {
  getAllUsers,
  createNewUser,
};
