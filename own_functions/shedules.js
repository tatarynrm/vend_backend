const cron = require("node-cron");
const db = require("../db/db");

const cancelMachineBalanceAtStartOfMonth = async () => {
  try {
    const result = await db.query(`update water_machine 
    set month_balance = 0
    `)
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// Schedule the task
const testSchedule = () => {
  const schedule = "0 9 1 * *"; // 11:56 PM
  cron.schedule(schedule, () => {
    // Execute the script using child_process
    cancelMachineBalanceAtStartOfMonth()
    console.log("Null all machine balances");
  });
};


module.exports = {
  testSchedule,
};
