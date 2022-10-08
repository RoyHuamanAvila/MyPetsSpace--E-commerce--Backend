const jwt = require("jsonwebtoken");

const signToken = async (data) => {
  const token = await jwt.sign(data, "PetLover", {expiresIn: "1h"});
  return token;
};

const verifyToken = async (token) => {
  const data = await jwt.verify(token, "PetLover");
  return data;
};

module.exports = {
  signToken,
  verifyToken,
};
