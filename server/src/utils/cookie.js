const parseCookie = (cookieStr) => {
  return cookieStr.split("; ").reduce((prev, current) => {
    const [name, value] = current.split("=");
    prev[name] = value;
    return prev;
  }, {});
};

const getUserNameFromSocket = (socket) => {
  if (socket.handshake.query && socket.handshake.query.uuid) {
    return socket.handshake.query.uuid;
  }

  const cookie = socket.client.request.headers.cookie;
  const uuid = parseCookie(cookie)["user_uuid"];
  return uuid;
};

const getDeviceTypeFromSocket = (socket) => {
  // const headers = socket.client.request.headers;
  // if (headers) {
  //   return headers['user-agent']
  // };

  return 'unknown';
};

module.exports = {
  parseCookie,
  getUserNameFromSocket,
  getDeviceTypeFromSocket,
};
