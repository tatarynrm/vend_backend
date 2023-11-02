const db = require("../db/db");

const getAllTodaySms = async (req, res) => {
  try {
    // const reuslt = await db.query(`select * from sms_status`)
    const result = await db.query(`
        SELECT *
        FROM sms_status a
        FULL OUTER JOIN company b ON a.company_id = b.id
        FULL OUTER JOIN view_sms_price c ON a.sms_price = c.id
        WHERE DATE(a.created_at) >= current_date
        LIMIT 100
      `);
    console.log(result);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
  }
};

const getSmsByDate = async (req, res) => {
  const { dateFrom, dateTo } = req.body;
  try {
    if ((dateFrom !== "") & (dateTo !== "")) {
      const result = await db.query(`
    SELECT *
    FROM sms_status a
    FULL OUTER JOIN company b ON a.company_id = b.id
    FULL OUTER JOIN view_sms_price c ON a.sms_price = c.id
    WHERE DATE(a.created_at) >= '${dateFrom}' AND DATE(a.created_at) <= '${dateTo}'
  `);
      res.status(200).json(result.rows);
    } else {
      res.status(400).json({
        msg: "Bad Request!No Date",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
const getSmsByDateAndCompany = async (req, res) => {
  const { dateFrom, dateTo,company_id } = req.body;
  console.log(company_id);
  try {
    if ((dateFrom !== "") & (dateTo !== "")) {
      const result = await db.query(`
            SELECT *
            FROM sms_status a
            FULL OUTER JOIN company b ON a.company_id = b.id
            FULL OUTER JOIN view_sms_price c ON a.sms_price = c.id
            WHERE DATE(a.created_at) >= '${dateFrom}' AND DATE(a.created_at) <= '${dateTo}' and company_id = ${+company_id}
          `);
      res.status(200).json(result.rows);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTodaySms,
  getSmsByDate,
  getSmsByDateAndCompany,
};
