const { default: axios } = require("axios");
const db = require("../db/db");

const getVodafoneToken = async () => {

  return new Promise((resolve, reject) => {
    db.query(
      "SELECT access_token, created_at FROM vodafone_token ORDER BY id DESC LIMIT 1",
      async (err, result) => {
        if (err) return reject(err);

        const tokenRow = result.rows[0];
        const now = new Date();

        if (tokenRow) {
          const createdAt = new Date(tokenRow.created_at);
          const diffHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

          if (diffHours < 6) {
            // Токен ще дійсний
            return resolve(tokenRow.access_token);
          }
        }

        // Отримуємо новий токен
        try {
          const tokenResponse = await axios.post(
            "https://a2p.vodafone.ua/uaa/oauth/token",
            null,
            {
              params: {
                grant_type: "password",
                username: 380675576609,
                password: "!0250910zXcDanil",
              },
              headers: {
                Authorization: "Basic d2ViYXBwOndlYmFwcA==",
              },
            }
          );

          const newToken = tokenResponse.data.access_token;

          // Зберігаємо в базу
          db.query(
            "INSERT INTO vodafone_token (access_token) VALUES ($1)",
            [newToken],
            (err) => {
              if (err) return reject(err);
              return resolve(newToken);
            }
          );
        } catch (err) {
          return reject(err);
        }
      }
    );
  });
};

module.exports = getVodafoneToken