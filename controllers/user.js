const { autoCommit } = require("oracledb");
const db = require("../db/db");

const getAllUsers = async (req, res) => {
  try {
    const users = await db.query(
      `select a.* from public.user a full outer join company b on a.company_id = b.id `
    );

    res.status(200).json(users.rows);
  } catch (error) {
    console.log(error);
  }
};

// ADMIN
const createNewUser = async (req, res) => {
  const { name, surname, last_surname, email, password, tel, company_id } =
    req.body;

  try {
    const user = await db.query(
      `select * from public.user where email = '${email}'`
    );

    console.log(user.rows);
    if (user.rows[0]) {
      res.status(201).json({
        message: "User already exist",
      });
    } else {
      const newUser = await db.query(
        `
        INSERT INTO public.user (name,surname,last_surname,email,password,tel,company_id)
        values ('${name}','${surname}','${last_surname}','${email}','${password}','${tel}','${company_id}')
        `
      );
   
      res.status(200).json(newUser.command);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const userUpdate = async (req, res) => {
  const { id, name, surname, last_surname, email, password, tel } = req.body;
  console.log(id);

  try {
    const user = await db.query(
      `update public.user set name ='${name}',surname = '${surname}', last_surname='${last_surname}', password ='${password}',email='${email}',tel='${tel}'  where id = '${+id}'`
    );
    res.status(200).json({
      msg: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};
const userDelete = async (req, res) => {
  const { id } = req.body;
  console.log(id);


  try {
    const user = await db.query(
      `delete from public.user where id =${id}`
    );
    res.status(200).json({
      msg: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllUsers,
  createNewUser,
  userUpdate,
  userDelete
};
