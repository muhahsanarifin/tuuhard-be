const redisClient = require("../configs/redis");

module.exports = {
  set: async (token, expiry) => {
    try {
      // const result = await redisClient.set("token", token, {
      //   EX: expiry,
      //   NX: true,
      // });
      const result = await redisClient.set("token", token, {
        EX: expiry,
      });
      return console.log("Set:", result);
    } catch (error) {
      return console.log("Error:", error);
    }
  },
  get: async (key) => {
    try {
      const result = await redisClient.get(key);
      return console.log("Get:", result);
    } catch (error) {
      return console.log("Error:", error);
    }
  },
  quit: async () => {
    try {
      // if (redisClient) {
      //   const result = await redisClient.quit();
      //   return console.log("Quit:", result);
      // }
      const result = await redisClient.quit();
      return console.log("Quit:", result);
    } catch (error) {
      return console.log("Error:", error);
    }
  },
  disconnect: async () => {
    try {
      const result = await redisClient.disconnect();
      return console.log("Disconnect:", result);
    } catch (error) {
      return console.log("Error :", error);
    }
  },
};
