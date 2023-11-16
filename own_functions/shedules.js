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


// function isLastDayOfMonth() {
//   const today = new Date();
//   const nextDay = new Date();
//   nextDay.setDate(today.getDate() + 1);
//   return today.getMonth() !== nextDay.getMonth();
// }

// // Define the cron schedule to check if today is the last day of the month (e.g., every day at midnight)
// const schedule = '0 0 * * *'; // Midnight

// // Schedule the task
// cron.schedule(schedule, () => {
//   if (isLastDayOfMonth()) {
//     // Call your function to run on the last day of the month
//     yourFunctionToRunOnLastDay();
//   }
// });

// function yourFunctionToRunOnLastDay() {
//   console.log('This function runs on the last day of the month.');
// }

module.exports = {
  testSchedule,
};
