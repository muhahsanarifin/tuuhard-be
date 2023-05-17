const redisClient = require("../configs/redis");

module.exports = {
  set: async (key, value, expiry) => {
    try {
      // const result = await redisClient.set(key, value, {
      //   EX: expiry,
      //   NX: true,
      // });
      const result = await redisClient.set(key, value, {
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
      console.log("Get:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return error;
    }
  },
  delete: async (key) => {
    try {
      const result = await redisClient.del(key);
      console.log("Delete:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return error;
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
