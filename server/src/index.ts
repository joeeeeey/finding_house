import 'module-alias/register';

import { getMongoDB } from '@utils/mongo';

import { GraphQLServer } from 'graphql-yoga'
// import GraphQLJSON from 'graphql-type-json';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';


const typeDefs = `
  scalar JSON
  scalar JSONObject

  type Query {
    getProperties(
      price: String
      area: String
      name: String
      pageNumber: Int = 1
      pageSize: Int = 10
    ): [Property!]!
  }

  type Mutation {
    createDemand(input: createDemandInput): Int
  }

  input createDemandInput {
    email: String
    price: JSON
    rooms: [String]
    village: [String]
    areas: [String]
  }

  type Property {
    date: String!
    area: String!
    village: String!
    description: String!
    room: String!
    size: String!
    price: String!
  }
`

const combinePropertyQuery = ({
  name,
  area,
  price,
}) => {
  const query = {}
  if (name) {
    query['description'] = new RegExp(name);
  }
  if (area) {
    query['area'] = area;
  }
  if (price) {
    query['price'] = price;
  }

  return query;
}

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  Mutation: {
    createDemand: async (_, {input}) => {
      console.log('args: ', input);
      const {
        email, price
      } = input;

      console.log('price: ', price, email);
      console.log('price: ', price.asd);

      return 12313
    }
  },
  Query: {
    getProperties: async (_, args) => {
      console.log('args: ', args);

      const { pageSize, pageNumber } = args;
      const offset = (pageNumber - 1) * pageSize;
      const query = combinePropertyQuery(args);
      console.log('query: ', query);

      let config = null

      if (process.env.NODE_ENV === 'development') {
        config = {
          MONGO_DB_HOST: "127.0.0.1",
          MONGO_DB_PORT: "27022",
          MONGO_DB_USERNAME: "admin",
          MONGO_DB_PASSWORD: "123456",
          MONGO_DB_NAME: "admin",
        }
      }

      const mongodb = await getMongoDB(config);
      const propertyDB = await mongodb.collection("properties");
      const properties = await propertyDB.find(query).skip(offset).limit(pageSize).toArray()

      return properties;
    
    },
  },
}

const options = { port: 4000 }
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(options, () => console.log('Server is running on localhost:' + options.port))
