/**
 * @file Logic of set and get userInfoKey,
 * 
 * `userInfoKey` is a single instance of one node process,
 *  which used to present current socket redis key.
 */

// const { SOCKET_USER_INFO_KEY } = require("../constants");

let userInfoRedisKey = null;

const getUserInfoKey = () => userInfoRedisKey;
const setUserInfoKey = (value) => {
  userInfoRedisKey = value
  return userInfoRedisKey;
};

module.exports = {
  getUserInfoKey,
  setUserInfoKey,
}