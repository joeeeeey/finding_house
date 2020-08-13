const Redis = require("ioredis");

const ONE_DAY = 60 * 60 * 24;

const redisHost =  process.env.REDIS_SERVER || "127.0.0.1"
const redisPort =  process.env.REDIS_PORT || 6379

/**
 * Set up redis connection
 */
const redis = new Redis(
  parseInt(process.env.REDIS_PORT, 10) || redisPort,
  redisHost,
  {
    db: parseInt(process.env.REDIS_DB, 10) || 1
  }
);

redis.on("connect", () => {console.log('redis connect success!');});

const ioRedis = {
  async get(key) {
    const res = await redis.get(key);
    if (!res) {
      return null;
    }

    return JSON.parse(res);
  },
  async set(key, value, maxAge) {
    const settedMaxAge = maxAge || ONE_DAY;
    const storedValue = JSON.stringify(value);
    await redis.set(key, storedValue, "EX", settedMaxAge);
  },

  async hmset(key, value) {
    await redis.hmset(key, value);
  },
  async hget(key, field) {
    return await redis.hget(key, field);
  },
  async hmget(key, fields) {
    return await redis.hmget(key, fields);
  },
  async destroy(key) {
    await redis.del(key);
  },
  redis,
  subscribe: redis.subscribe,
  publish: redis.publish, // Why not work?
};

/**
 *
 * Why we need another redis client to do sub.
 * Ref: https://github.com/luin/ioredis#pubsub
 * 
 * When a client issues a SUBSCRIBE or PSUBSCRIBE, that connection is put into a "subscriber" mode. 
 * At that point, only commands that modify the subscription set are valid. 
 * When the subscription set is empty, the connection is put back into regular mode. 
 * If you need to send regular commands to Redis while in subscriber mode,
 * just open another connection.
 *
 */
var redisSubClient = new Redis(
  parseInt(process.env.REDIS_PORT, 10) || redisPort,
  redisHost,
  {
    db: parseInt(process.env.REDIS_DB, 10) || 1
  }
);

redisSubClient.subscribe(
  "changeSocketUserInfoKey",
  "userLogout",
  "sendMsg",
  "newChannelCreate",
  "onlineOffline",
  "changeChannelMember",
  "channelFocused",
  function(err, count) {}
);

module.exports = {
  redisSubClient,
  ioRedis,
  redisHost,
  redisPort,
};
