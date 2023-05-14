const redis = require("redis");

const client = redis.createClient({
  url: process.env.URL_REDIS,
  username: process.env.USERNAME_REDIS,
  password: process.env.PASSWORD_REDIS,
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("error", (err) => {
  console.log("Error:", err);
});

module.exports = client;
