import 'module-alias/register';

import { getMongoDB } from '@utils/mongo';

import { GraphQLServer } from 'graphql-yoga'


// const typeDefs = `
//   type Query {
//     hello(name: String): String!
//     helloB(name: String): Asd
//   }

//   type Asd {
//     id: String!
//   }
// `

// const resolvers = {
//   Query: {
//     hello: (_, { name }) => `Hello ${name || 'World'}`,
//     helloB: (_, { name }) => {
//       return {
//         id: name
//       }
//     },
//   },
// }


const typeDefs = `
  type Query {
    getProperties(
      price: String
      area: String
      pageNumber: Int = 1
      pageSize: Int = 10
    ): [Property!]!
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

const resolvers = {
  Query: {
    getProperties: async (_, args) => {
      console.log('args: ', args);

      const { price, pageSize, pageNumber } = args;
      const offset = (pageNumber - 1) * pageSize;

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
      const properties = await propertyDB.find({ price }).skip(offset)
      .limit(pageSize).toArray()

      return properties;
    
    },
  },
}

const options = { port: 4000 }
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(options, () => console.log('Server is running on localhost:' + options.port))
