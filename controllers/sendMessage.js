const db = require("../db/db");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const getVodafoneToken = require("../own_functions/getToken");
const sender = 6762347

const sendMsgAddLitr = async (req, res) => {
  const { data } = req.body;
  try {
    const queryParams = {
      grant_type: "password",
      username: 380675576609,
      password: "!0250910zXcDanil",
    };
    const headers = {
      Authorization: "Basic d2ViYXBwOndlYmFwcA==",
    };
const accessToken = await getVodafoneToken();

    if (accessToken && data) {
      const url =
        "https://a2p.vodafone.ua/communication-event/api/communicationManagement/v3/communicationMessage/send";
      const headers1 = {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${accessToken}`,
      };
      const data1 = {
        receiver: [data.smsInfo.machine_phone],
        cascades: [
          {
            transport: "SMS",
            senderId: sender,
            validityPeriod: "1",
            messageObject: {
              type: "SMS",
              smsMessage: {
                content: `pin=${+data.smsInfo
                  .machine_pin};addlits=${+data.liters};`,
              },
            },
          },
        ],
      };

      const sendLitersData = await axios({
        method: "post",
        url: url,
        headers: headers1,
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

  try {
    const queryParams = {
      grant_type: "password",
      username: 380675576609,
      password: "!0250910zXcDanil",
    };
    const headers = {
      Authorization: "Basic d2ViYXBwOndlYmFwcA==",
    };

const accessToken = await getVodafoneToken();

    if (accessToken && data) {
      const url =
        "https://a2p.vodafone.ua/communication-event/api/communicationManagement/v3/communicationMessage/send";

      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `bearer ${accessToken}`,
      };
      const data1 = {
        receiver: [+data.smsInfo.machine_phone],
        cascades: [
          {
            transport: "SMS",
            senderId: sender,
            validityPeriod: "1",
            messageObject: {
              type: "SMS",
              smsMessage: {
                content: `pin=${+data.smsInfo.machine_pin};reboot;`,
              },
            },
          },
        ],
      };

      console.log(data1 , 'DATA ! SMS SEND');
      console.log(data , 'DATA FROM CLINT');
      
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

  try {
    const queryParams = {
      grant_type: "password",
      username: 380675576609,
      password: "!0250910zXcDanil",
    };
    const headers = {
      Authorization: "Basic d2ViYXBwOndlYmFwcA==",
    };
const accessToken = await getVodafoneToken();

    if (accessToken && data) {
      const url =
        "https://a2p.vodafone.ua/communication-event/api/communicationManagement/v3/communicationMessage/send";

      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `bearer ${accessToken}`,
      };

      const data1 = {
        receiver: [+data.smsInfo.machine_phone],
        cascades: [
          {
            transport: "SMS",
            senderId: sender,
            validityPeriod: "1",
            messageObject: {
              type: "SMS",
              smsMessage: {
                content: `pin=${+data.smsInfo.machine_pin};collect;`,
              },
            },
          },
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
const sendPriceForLitr = async (req, res) => {
  const { data } = req.body;

  try {
    const queryParams = {
      grant_type: "password",
      username: 380675576609,
      password: "!0250910zXcDanil",
    };
    const headers = {
      Authorization: "Basic d2ViYXBwOndlYmFwcA==",
    };

const accessToken = await getVodafoneToken();
    if (accessToken && data) {
      const url =
        "https://a2p.vodafone.ua/communication-event/api/communicationManagement/v3/communicationMessage/send";

      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `bearer ${accessToken}`,
      };
      // const data1 = {
      //   content: `pin=${+data.smsInfo
      //     .machine_pin};setprice:1=${+data.priceForLiter};`,
      //   type: "SMS",
      //   receiver: [
      //     { id: +data.smsInfo.id, phoneNumber: +data.smsInfo.machine_phone },
      //   ],
      //   sender: { id: "Vend Water" },
      //   characteristic: [
      //     { name: "DISTRIBUTION.ID", value: 5029972 },
      //     { name: "VALIDITY.PERIOD", value: "000000000100000R" },
      //   ],
      // };
      const data1 = {
        receiver: [+data.smsInfo.machine_phone],
        cascades: [
          {
            transport: "SMS",
            senderId: sender,
            validityPeriod: "1",
            messageObject: {
              type: "SMS",
              smsMessage: {
                content: `pin=${+data.smsInfo
          .machine_pin};setprice:1=${+data.priceForLiter};`,
              },
            },
          },
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
    const queryParams = {
      grant_type: "password",
      username: 380675576609,
      password: "!0250910zXcDanil",
    };
    const headers = {
      Authorization: "Basic d2ViYXBwOndlYmFwcA==",
    };
const accessToken = await getVodafoneToken();

    if (accessToken && data) {
      const url =
        "https://a2p.vodafone.ua/communication-event/api/communicationManagement/v3/communicationMessage/send";

      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `bearer ${accessToken}`,
      };

      const data1 = {
        receiver: [+data.smsInfo.machine_phone],
        cascades: [
          {
            transport: "SMS",
            senderId: sender,
            validityPeriod: "1",
            messageObject: {
              type: "SMS",
              smsMessage: {
                content: `pin=${+data.smsInfo.machine_pin};getinfo;`,
              },
            },
          },
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
    const queryParams = {
      grant_type: "password",
      username: 380675576609,
      password: "!0250910zXcDanil",
    };
    const headers = {
      Authorization: "Basic d2ViYXBwOndlYmFwcA==",
    };
const accessToken = await getVodafoneToken();

    if (accessToken && data) {
      const url =
        "https://a2p.vodafone.ua/communication-event/api/communicationManagement/v3/communicationMessage/send";

      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `bearer ${accessToken}`,
      };

      const data1 = {
        receiver: [+data.smsInfo.machine_phone],
        cascades: [
          {
            transport: "SMS",
            senderId: sender,
            validityPeriod: "1",
            messageObject: {
              type: "SMS",
              smsMessage: {
                content: `pin=${+data?.smsInfo
                  ?.machine_pin};setpin=${+data?.pin};`,
              },
            },
          },
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
    // const queryParams = {
    //   grant_type: "password",
    //   username: 380675576609,
    //   password: "!0250910zXcDanil",
    // };
    // const headers = {
    //   Authorization: "Basic aW50ZXJuYWw6aW50ZXJuYWw=",
    // };
    // const token = await axios.post(
    //   "https://a2p.vodafone.ua/uaa/oauth/token",
    //   null,
    //   {
    //     params: queryParams,
    //     headers: headers,
    //   }
    // );

    // const url =
    //   "https://a2p.vodafone.ua/communication-event/api/communicationManagement/v2/communicationMessage/send";

    // const headers = {
    //   "Content-Type": "application/json",
    //   Accept: "*/*",
    //   Authorization: `bearer ${token.data.access_token}`,
    // };
    // const data1 = {
    //   content: `pin=${+data.smsInfo
    //     .machine_pin};settelnum:1=${+data.newNumber};`,
    //   type: "SMS",
    //   receiver: [
    //     { id: +data.smsInfo.id, phoneNumber: +data.smsInfo.machine_phone },
    //   ],
    //   sender: { id: "Vend Water" },
    //   characteristic: [
    //     { name: "DISTRIBUTION.ID", value: 5029972 },
    //     { name: "VALIDITY.PERIOD", value: "000000000100000R" },
    //   ],
    // };

    // const sendLitersData = await axios({
    //   method: "post",
    //   url: url,
    //   headers: headers,
    //   // data: data1,
    // })
    // .then((response) => {
    //   db.query(
    //     `
    //              INSERT INTO sms_status (company_id,status,status_id,status_name)
    //              values (${+data.userData
    //                .company_id},'${"ACCEPTED"}',${7},'${"Заміна номера модуля"}')
    //              `,
    //     (error, result) => {
    //       if (error) {
    //         console.error("Error executing query", error);
    //       } else {
    //         console.log("Query result:", result.rows);
    //       }
    //     }
    //   );

    const result = await db.query(
      `update water_machine set machine_phone = ${+data.newNumber}
             where machine_id =${+data.smsInfo.machine_id}
            `
    );

    console.log("Response:", result.rows);
    res.json(result);
    // })
    // .catch((error) => {
    //   console.error("Error:", error.message);
    // });
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
    const queryParams = {
      grant_type: "password",
      username: 380675576609,
      password: "!0250910zXcDanil",
    };
    const headers = {
      Authorization: "Basic d2ViYXBwOndlYmFwcA==",
    };
const accessToken = await getVodafoneToken();
  
    

    if (accessToken && data) {
      const url =
      "https://a2p.vodafone.ua/communication-event/api/communicationManagement/v3/communicationMessage/send";
      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${accessToken}`,
      };

      const data1 = {
        receiver: [+data.smsInfo.machine_phone],
        cascades: [
          {
            transport: "SMS",
            senderId: sender,
            validityPeriod: "1",
            messageObject: {
              type: "SMS",
              smsMessage: {
                content: `pin=${+data.smsInfo.machine_pin};settok=${
                  data?.newToken
                };`,
              },
            },
          },
        ],
      };
      const sendLitersData3 = await axios({
        method: "POST",
        url: url,
        headers: headers,
        data: data1,
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

          console.log('RESPONSE',response.data);
          
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
    const queryParams = {
      grant_type: "password",
      username: 380675576609,
      password: "!0250910zXcDanil",
    };
    const headers = {
      Authorization: "Basic aW50ZXJuYWw6aW50ZXJuYWw=",
    };
const accessToken = await getVodafoneToken();

    if (accessToken && data) {
      const url =
      "https://a2p.vodafone.ua/communication-event/api/communicationManagement/v3/communicationMessage/send";

      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `bearer ${accessToken}`,
      };
      const data1 = {
        receiver: [+data.smsInfo.machine_phone],
        cascades: [
          {
            transport: "SMS",
            senderId: sender,
            validityPeriod: "1",
            messageObject: {
              type: "SMS",
              smsMessage: {
                content: `pin=${+data.smsInfo.machine_pin};setantaddr=${
                  data.newAnthillAddress
                };`,
              },
            },
          },
        ],
      };
      console.log(data,'DATA');
      console.log(data1,'DATA SMS');
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
    const queryParams = {
      grant_type: "password",
      username: 380675576609,
      password: "!0250910zXcDanil",
    };
    const headers = {
      Authorization: "Basic d2ViYXBwOndlYmFwcA==",
    };
const accessToken = await getVodafoneToken();

    if (accessToken && data) {
      const url =
        "https://a2p.vodafone.ua/communication-event/api/communicationManagement/v3/communicationMessage/send";

      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `bearer ${accessToken}`,
      };

      const data1 = {
        receiver: [+data.smsInfo.machine_phone],
        cascades: [
          {
            transport: "SMS",
            senderId: sender,
            validityPeriod: "1",
            messageObject: {
              type: "SMS",
              smsMessage: {
                content: `pin=${+data.smsInfo.machine_pin};settelnum:1=${
                  data.serviceNumber
                };`,
              },
            },
          },
        ],
      };
      console.log(data,'DATA');
      console.log(data1,'DATA SMS');
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
