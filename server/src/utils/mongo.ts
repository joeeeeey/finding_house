const MongoClient = require("mongodb").MongoClient;
export const ObjectID = require("mongodb").ObjectID;

let mongodb = null;

export async function getMongoDB() {
  if (!mongodb) {
    // const MONGO_DB_NAME = MONGO_DB_NAME || "admin";
    // https://github.com/Automattic/mongoose/issues/8156
    // const client = await MongoClient.connect("mongodb://127.0.0.1:27018", {
    const {
      MONGO_DB_HOST = "127.0.0.1",
      MONGO_DB_PORT = "27017",
      MONGO_DB_USERNAME,
      MONGO_DB_PASSWORD,
      MONGO_DB_NAME = "admin",
    } = process.env;

    const mongoDBUrl = `mongodb://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`;

    console.log("mongoDBUrl: ", mongoDBUrl);
    console.log("dbName: ", MONGO_DB_NAME);

    const client = await MongoClient.connect(mongoDBUrl, {
      useUnifiedTopology: true,
    });
    mongodb = client.db(MONGO_DB_NAME)
    return mongodb;
  }
  return mongodb;
}

//  export const asd = { getMongoDB, ObjectID };
