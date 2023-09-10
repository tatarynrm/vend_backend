const db = require("../db/db");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const sendMsgAddLitr = async (req, res) => {
  const { data } = req.body;
  console.log(data);
  try {
    const queryParams = {
      grant_type: "password",
      username: 380675576609,
      password: "!0250910zXcDanil",
    };
    const headers = {
      Authorization: "Basic aW50ZXJuYWw6aW50ZXJuYWw=",
    };
    const token = await axios.post(
      "https://a2p.vodafone.ua/uaa/oauth/token",
      null,
      {
        params: queryParams,
        headers: headers,
      }
    );


    if (token && data) {
       
        const url =
          "https://a2p.vodafone.ua/communication-event/api/communicationManagement/v2/communicationMessage/send";
      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `bearer ${token.data.access_token}`,
      };
      const data1 = {
        content: `pin=${+data.smsInfo.machine_pin};addlits=${+data.liters};`,
        type: "SMS",
        receiver: [
          { id: +data.smsInfo.id, phoneNumber: +data.smsInfo.machine_phone },
        ],
        sender: { id: "Vend Water" },
        characteristic: [
          { name: "DISTRIBUTION.ID", value: 5029972 },
          { name: "VALIDITY.PERIOD", value: "000000000100000R" },
        ],
      };

      const sendLitersData = await axios({
        method: "post",
        url: url,
        headers: headers,
        data: data1,
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
  console.log(data);
  try {
    const queryParams = {
      grant_type: "password",
      username: 380675576609,
      password: "!0250910zXcDanil",
    };
    const headers = {
      Authorization: "Basic aW50ZXJuYWw6aW50ZXJuYWw=",
    };
    const token = await axios.post(
      "https://a2p.vodafone.ua/uaa/oauth/token",
      null,
      {
        params: queryParams,
        headers: headers,
      }
    );

    if (token && data) {
        const url =
          "https://a2p.vodafone.ua/communication-event/api/communicationManagement/v2/communicationMessage/send";

      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `bearer ${token.data.access_token}`,
      };
      const data1 = {
        content: `pin=${+data.smsInfo.machine_pin};reboot;`,
        type: "SMS",
        receiver: [
          { id: +data.smsInfo.id, phoneNumber: +data.smsInfo.machine_phone },
        ],
        sender: { id: "Vend Water" },
        characteristic: [
          { name: "DISTRIBUTION.ID", value: 5029972 },
          { name: "VALIDITY.PERIOD", value: "000000000100000R" },
        ],
      };

      const sendLitersData = await axios({
        method: "post",
        url: url,
        headers: headers,
        data: data1,
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
  console.log(data);
  try {
    const queryParams = {
      grant_type: "password",
      username: 380675576609,
      password: "!0250910zXcDanil",
    };
    const headers = {
      Authorization: "Basic aW50ZXJuYWw6aW50ZXJuYWw=",
    };
    const token = await axios.post(
      "https://a2p.vodafone.ua/uaa/oauth/token",
      null,
      {
        params: queryParams,
        headers: headers,
      }
    );

    if (token && data) {
        const url =
          "https://a2p.vodafone.ua/communication-event/api/communicationManagement/v2/communicationMessage/send";

      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `bearer ${token.data.access_token}`,
      };
      const data1 = {
        content: `pin=${+data.smsInfo.machine_pin};collect;`,
        type: "SMS",
        receiver: [
          { id: +data.smsInfo.id, phoneNumber: +data.smsInfo.machine_phone },
        ],
        sender: { id: "Vend Water" },
        characteristic: [
          { name: "DISTRIBUTION.ID", value: 5029972 },
          { name: "VALIDITY.PERIOD", value: "000000000100000R" },
        ],
      };

      const sendLitersData = await axios({
        method: "post",
        url: url,
        headers: headers,
        data: data1,
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

module.exports = {
  sendMsgAddLitr,
  sendRestartModule,
  sendCollectCash,
};
