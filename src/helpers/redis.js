const redisClient = require("../configs/redis");

module.exports = {
  set: async (key, value, expiry) => {
    try {
      const result = await redisClient.set(key, value, {
        EX: expiry,
      });
      console.log("Set:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return error;
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
      const result = await redisClient.quit();
      console.log("Quit:", result);
      return result;
    } catch (error) {
      console.log("Error:", error);
      return error;
    }
  },
  disconnect: async () => {
    try {
      const result = await redisClient.disconnect();
      console.log("Disconnect:", result);
      return result;
    } catch (error) {
      console.log("Error :", error);
      return error;
    }
  },
};
