const { autoCommit } = require("oracledb");
const db = require("../db/db");

// ADMIN
const getAllCompanies = async (req, res) => {
  console.log("company", "dsada");
  try {
    const company = await db.query(`select * from company`);
    // console.log(users);
    res.status(200).json(company.rows);
  } catch (error) {
    console.log(error);
  }
};

const createCompany = async (req, res) => {
  const {
    company_name,
    director_name,
    director_surname,
    director_last_surname,
    company_code,
    legal_address,
    phone_number,
  } = req.body;
  const client = await db.connect();
  try {
    const company = await client.query(
      `select * from company where company_code = '${company_code}'`
    );

    console.log(company.rows);
    if (company.rows[0]) {
      res.status(201).json({
        message: "Company already exist",
      });
    } else {
      const newCompany = await client.query(
        `
             INSERT INTO company (company_name,director_name,director_surname,director_last_surname,company_code,legal_address,phone_number)
             values ('${company_name}','${director_name}','${director_surname}','${director_last_surname}','${company_code}','${legal_address}','${phone_number}')
             `
      );
      console.log(newCompany);
      res.status(200).json(newCompany.command);
    }
  } catch (error) {
    console.log(error);
  }
};
const editCompany = async (req, res) => {
  const {
    company_name,
    director_name,
    director_surname,
    director_last_surname,
    company_code,
    legal_address,
    phone_number,
    id,
  } = req.body;
  console.log(company_code);

  try {
    const client = await db.connect();
    const update = client.query(`
  update company set company_name = '${company_name}',director_name = '${director_name}',
  director_surname = '${director_surname}',director_last_surname ='${director_last_surname}',
  company_code = ${+company_code},legal_address = '${legal_address}',
  phone_number = ${+phone_number} where id = ${+id}
`);
    res.status(200).json({
      msg: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllCompanies,
  createCompany,
  editCompany,
};
