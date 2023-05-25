const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on("connect", () => {
  console.log("Connected to Redis.");
});

client.on("error", (err) => {
  console.log("Error:", err);
});

client.on("end", () => {
  console.log("Client was disconnected from Redis.");
});

client.on("SIGINT", () => {
  client.quit();
});

// Note: Promise.prototype.then();
client.connect().then();

module.exports = client;
