
import 'module-alias/register';
// import data into mongo
import { getMongoDB } from '@utils/mongo';
import * as csv from "csvtojson";
import * as fs from 'fs';

const main = async () => {
  const config = {
    MONGO_DB_HOST: "127.0.0.1",
    MONGO_DB_PORT: "27022",
    MONGO_DB_USERNAME: "admin",
    MONGO_DB_PASSWORD: "123456",
    MONGO_DB_NAME: "admin",
  }
  const mongodb = await getMongoDB(config);
  const propertyDB = await mongodb.collection("properties");

  propertyDB.createIndex({ date: 1, area: 1, village: 1, description: 1, room: 1, size: 1, price: 1, }, { unique: true })

  console.log('propertyDB: ', propertyDB);

  const city = 'sh'
  const date = '20200707'
  const rentFiles = await fs.readdirSync(`/Users/joeeey/my-projects/finding_house/lianjia-beike-spider/data/lianjia/zufang/${ city }/${ date }`)
  console.log('rentFiles: ', rentFiles);
  for (let i = 0; i < rentFiles.length; i++) {
    const rentFile = rentFiles[i];
    const rentData = await csv({
      noheader: false,
      // headers: ['price','date', 'area', 'village', 'description', 'room', 'size' ]
      headers: ['date', 'area', 'village', 'description', 'room', 'size', 'price']
    }).fromFile(`/Users/joeeey/my-projects/finding_house/lianjia-beike-spider/data/lianjia/zufang/${ city }/${ date }/${ rentFile }`);

    rentData.forEach(x => {
      x.city = city
    });
    try {
      await propertyDB.insertMany(rentData, { ordered: false });
    } catch (error) { }

  }
}


main()
