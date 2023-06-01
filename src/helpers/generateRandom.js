const random = (prefix, customerId) => {
  const timeStamp = Date.now().toString(36);
  const RandomNumber = Math.random().toString(36).substring(2); // Return the part of "Math.random().toString(36)" from the start index 2
  return prefix + customerId.toString() + "-" + timeStamp + RandomNumber;
};

module.exports = random;
