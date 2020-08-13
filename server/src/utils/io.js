const { ioRedis, redisHost, redisPort } = require("../utils/redis");
const { getUserRelationSocketIds } = require("../helpers/user");
const socketRedis = require("socket.io-redis");

let io = null
const IO_NAMESPACE= "chat_center";

const initializeIO = (server) => {
  const io_s = require("socket.io")(server, {
    pingTimeout: 60000,
    pingInterval: 5000,
  });
  
  io_s.adapter(
    socketRedis({
      host: redisHost,
      port: redisPort,
    })
  );

  io = io_s.of(IO_NAMESPACE);
  return io;
}

const getIO = () => {
  return io;
}

// payload: { uuid, action: "offline" }
const sendOnlineOfflineMsg = async (payload = {}) => {
  const { uuid } = payload;
  if (uuid) {
    const socketIds = await getUserRelationSocketIds(uuid);

    ioRedis.redis.publish(
      "onlineOffline",
      JSON.stringify({
        socketIds,
        payload,
      })
    );
  }
};

module.exports = {
  sendOnlineOfflineMsg,
  getUserRelationSocketIds,
  initializeIO,
  getIO,
};
