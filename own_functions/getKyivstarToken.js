const { default: axios } = require("axios");
const db = require("../db/db");

const getKyivstarToken = async () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT access_token, created_at FROM kyivstar_token ORDER BY id DESC LIMIT 1",
      async (err, result) => {
        if (err) return reject(err);

        const tokenRow = result.rows[0];
        const now = new Date();

        if (tokenRow) {
          const createdAt = new Date(tokenRow.created_at);
          const diffHours =
            (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

          if (diffHours < 6) {
            // Токен ще дійсний
            return resolve(tokenRow.access_token);
          }
        }

        // Отримуємо новий токен
        try {
          const tokenResponse = await axios.post(
            process.env.KYIVSTAR_TOKEN_URL,
            new URLSearchParams({
              grant_type: "client_credentials",
            }).toString(),
            {
              auth: {
                username: process.env.KYIVSTAR_CLIENT_ID,
                password: process.env.KYIVSTAR_CLIENT_SECRET,
              },
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          const newToken = tokenResponse.data.access_token;

          // Зберігаємо в базу
          db.query(
            "INSERT INTO kyivstar_token (access_token) VALUES ($1)",
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

module.exports = getKyivstarToken;
