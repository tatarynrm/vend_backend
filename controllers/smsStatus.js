// db.query(
//     `
//            INSERT INTO sms_status (company_id,status,status_id,status_name)
//            values (${1},'${"ACCEPTED"}',${1},'${"Видача води"}')
//            `,
//     (error, result) => {
//       if (error) {
//         console.error("Error executing query", error);
//       } else {
//         console.log("Query result:", result.rows);
//       }
//     }
//   );