const db = require("../db/db");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const getVodafoneToken = require("../own_functions/getToken");
const getKyivstarToken = require("../own_functions/getKyivstarToken");
const sender = 6762347;
const KYIVSTAR_API_LINK_SEND_SMS =
  "https://api-gateway.kyivstar.ua/rest/v1/sms";
const url = KYIVSTAR_API_LINK_SEND_SMS;
const sendMsgAddLitr = async (req, res) => {
  const { data } = req.body;

  try {
    const accessToken = await getKyivstarToken();

    if (accessToken && data) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const kyivstar_sms_data = {
        from: "VendWater",
        to: data.smsInfo.machine_phone,
        text: `pin=${+data.smsInfo.machine_pin};addlits=${+data.liters};`,
      };

      const result = await axios({
        method: "POST",
        url: KYIVSTAR_API_LINK_SEND_SMS,
        headers: headers,
        data: kyivstar_sms_data,
      })
        .then((response) => {
          db.query(
            `
                     INSERT INTO sms_status (company_id,status,status_id,status_name)
                     values (${+data.userData
                       .company_id},'${"ACCEPTED"}',${1},'${"Видача води"}')
                     `,
            (error, result) => {
              if (error) {
                console.error("Error executing query", error);
              } else {
                console.log("Query result:", result.rows);
              }
            }
          );
          res.status(200).json(response.data);

          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
};
const sendRestartModule = async (req, res) => {
  const { data } = req.body;

  try {
    const accessToken = await getKyivstarToken();

    if (accessToken && data) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const kyivstar_sms_data = {
        from: "VendWater",
        to: data.smsInfo.machine_phone,
        text: `pin=${+data.smsInfo.machine_pin};reboot;`,
      };

      const result = await axios({
        method: "POST",
        url: KYIVSTAR_API_LINK_SEND_SMS,
        headers: headers,
        data: kyivstar_sms_data,
      })
        .then((response) => {
          db.query(
            `
                     INSERT INTO sms_status (company_id,status,status_id,status_name)
                     values (${+data.userData
                       .company_id},'${"ACCEPTED"}',${2},'${"Перезавантаження модуля"}')
                     `,
            (error, result) => {
              if (error) {
                console.error("Error executing query", error);
              } else {
                console.log("Query result:", result.rows);
              }
            }
          );
          res.status(200).json(response.data);

          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
};
const sendCollectCash = async (req, res) => {
  const { data } = req.body;

  try {
    const accessToken = await getKyivstarToken();

    if (accessToken && data) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const kyivstar_sms_data = {
        from: "VendWater",
        to: data.smsInfo.machine_phone,
        text: `pin=${+data.smsInfo.machine_pin};collect;`,
      };

      const result = await axios({
        method: "POST",
        url: KYIVSTAR_API_LINK_SEND_SMS,
        headers: headers,
        data: kyivstar_sms_data,
      })
        .then((response) => {
          db.query(
            `
                     INSERT INTO sms_status (company_id,status,status_id,status_name)
                     values (${+data.userData
                       .company_id},'${"ACCEPTED"}',${3},'${"Collect Cash"}')
                     `,
            (error, result) => {
              if (error) {
                console.error("Error executing query", error);
              } else {
                console.log("Query result:", result.rows);
              }
            }
          );
          res.status(200).json(response.data);

          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
};
const sendPriceForLitr = async (req, res) => {
  const { data } = req.body;

  try {
    const accessToken = await getKyivstarToken();

    if (accessToken && data) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const kyivstar_sms_data = {
        from: "VendWater",
        to: data.smsInfo.machine_phone,
        text: `pin=${+data.smsInfo
          .machine_pin};setprice:1=${+data.priceForLiter};`,
      };

      const result = await axios({
        method: "POST",
        url: KYIVSTAR_API_LINK_SEND_SMS,
        headers: headers,
        data: kyivstar_sms_data,
      })
        .then((response) => {
          db.query(
            `
                     INSERT INTO sms_status (company_id,status,status_id,status_name)
                     values (${+data.userData
                       .company_id},'${"ACCEPTED"}',${4},'${"Зміна ціни"}')
                     `,
            (error, result) => {
              if (error) {
                console.error("Error executing query", error);
              } else {
                console.log("Query result:", result.rows);
              }
            }
          );
          res.status(200).json(response.data);

          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
};
const sendGetInfo = async (req, res) => {
  const { data } = req.body;

  try {
    const accessToken = await getKyivstarToken();

    if (accessToken && data) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const kyivstar_sms_data = {
        from: "VendWater",
        to: data.smsInfo.machine_phone,
        text: `pin=${+data.smsInfo.machine_pin};getinfo;`,
      };

      const result = await axios({
        method: "POST",
        url: KYIVSTAR_API_LINK_SEND_SMS,
        headers: headers,
        data: kyivstar_sms_data,
      })
        .then((response) => {
          db.query(
            `
                     INSERT INTO sms_status (company_id,status,status_id,status_name)
                     values (${+data.userData
                       .company_id},'${"ACCEPTED"}',${6},'${"Get Info"}')
                     `,
            (error, result) => {
              if (error) {
                console.error("Error executing query", error);
              } else {
                console.log("Query result:", result.rows);
              }
            }
          );
          res.status(200).json(response.data);

          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
};
// DONE change PIN
const changePin = async (req, res) => {
  const { data } = req.body;

  try {
    const accessToken = await getKyivstarToken();

    if (accessToken && data) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const kyivstar_sms_data = {
        from: "VendWater",
        to: data.smsInfo.machine_phone,
        text: `pin=${+data?.smsInfo?.machine_pin};setpin=${+data?.pin};`,
      };

      const result = await axios({
        method: "POST",
        url: KYIVSTAR_API_LINK_SEND_SMS,
        headers: headers,
        data: kyivstar_sms_data,
      })
        .then((response) => {
          db.query(
            `
                     INSERT INTO sms_status (company_id,status,status_id,status_name)
                     values (${+data.userData
                       .company_id},'${"ACCEPTED"}',${5},'${"Змінити пін"}')
                     `,
            (error, result) => {
              if (error) {
                console.error("Error executing query", error);
              } else {
                console.log("Query result:", result.rows);
              }
            }
          );
          res.status(200).json(response.data);
          console.log(data);
          db.query(
            `update  water_machine set machine_pin = ${
              +data?.pin !== NaN || +data?.pin !== undefined || +data?.pin
                ? +data?.pin
                : 1111
            }
             where machine_id =${+data.smsInfo.machine_id}
            `
          );

          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
};

// DONE change PIN
const changeNumber = async (req, res) => {
  const { data } = req.body;
  console.log(data);
  try {
    const result = await db.query(
      `update water_machine set machine_phone = ${+data.newNumber}
             where machine_id =${+data.smsInfo.machine_id}
            `
    );

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
};
const changeToken = async (req, res) => {
  const { data } = req.body;

  try {
    const accessToken = await getKyivstarToken();

    if (accessToken && data) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const kyivstar_sms_data = {
        from: "VendWater",
        to: data.smsInfo.machine_phone,
        text: `pin=${+data.smsInfo.machine_pin};settok=${data?.newToken};`,
      };

      const result = await axios({
        method: "POST",
        url: KYIVSTAR_API_LINK_SEND_SMS,
        headers: headers,
        data: kyivstar_sms_data,
      })
        .then((response) => {
          console.log("RESPONSE", response);

          db.query(
            `
                     INSERT INTO sms_status (company_id,status,status_id,status_name)
                     values (${+data.userData
                       .company_id},'${"ACCEPTED"}',${8},'${"Встановити токен"}')
                     `,
            (error, result) => {
              if (error) {
                console.error("Error executing query", error);
              } else {
                console.log("Query result:", result.rows);
              }
            }
          );
          res.status(200).json(response.data);

          console.log("RESPONSE", response.data);

          db.query(
            `update water_machine set machine_token = '${
              data.newToken
            }' where machine_id = ${+data.smsInfo.machine_id}
            `
          );

          // console.log("Response:-------", response.data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
};
const changeAddress = async (req, res) => {
  const { data } = req.body;
  try {
    const accessToken = await getKyivstarToken();

    if (accessToken && data) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const kyivstar_sms_data = {
        from: "VendWater",
        to: data.smsInfo.machine_phone,
        text: `pin=${+data.smsInfo.machine_pin};setantaddr=${
          data.newAnthillAddress
        };`,
      };

      const result = await axios({
        method: "POST",
        url: KYIVSTAR_API_LINK_SEND_SMS,
        headers: headers,
        data: kyivstar_sms_data,
      })
        .then((response) => {
          db.query(
            `
                     INSERT INTO sms_status (company_id,status,status_id,status_name)
                     values (${+data.userData
                       .company_id},'${"ACCEPTED"}',${9},'${"Заміна ADR"}')
                     `,
            (error, result) => {
              if (error) {
                console.error("Error executing query", error);
              } else {
                console.log("Query result:", result.rows);
              }
            }
          );
          res.status(200).json(response.data);
          console.log(data);
          db.query(
            `update  water_machine set machine_address = ${+data.newAnthillAddress}
             where machine_id =${+data.smsInfo.machine_id}
            `
          );

          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
};
const changeServiceNumber = async (req, res) => {
  const { data } = req.body;

  try {
    const accessToken = await getKyivstarToken();

    if (accessToken && data) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const kyivstar_sms_data = {
        from: "VendWater",
        to: data.smsInfo.machine_phone,
        text: `pin=${+data.smsInfo.machine_pin};settelnum:1=${
          data.serviceNumber
        };`,
      };

      const result = await axios({
        method: "POST",
        url: KYIVSTAR_API_LINK_SEND_SMS,
        headers: headers,
        data: kyivstar_sms_data,
      })
        .then((response) => {
          db.query(
            `
                     INSERT INTO sms_status (company_id,status,status_id,status_name)
                     values (${+data.userData
                       .company_id},'${"ACCEPTED"}',${10},'${"Change Service Number"}')
                     `,
            (error, result) => {
              if (error) {
                console.error("Error executing query", error);
              } else {
                console.log("Query result:", result.rows);
              }
            }
          );
          res.status(200).json(response.data);
          console.log(data);
          db.query(
            `update  water_machine set terminal_sim = '${data.serviceNumber}'
             where machine_id =${+data.smsInfo.machine_id}
            `
          );

          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
};

module.exports = {
  sendMsgAddLitr,
  sendRestartModule,
  sendCollectCash,
  sendPriceForLitr,
  sendGetInfo,
  changePin,
  changeNumber,
  changeToken,
  changeAddress,
  changeServiceNumber,
};
