// require('module-alias/register')
// require('something')
// import { getMongoDB } from './utils/mongo';
import 'module-alias/register';

import { getMongoDB } from '@utils/mongo';
console.log('getMongoDB: ', getMongoDB);
import { GraphQLServer } from 'graphql-yoga'

const sampleItems = [
  { name: 'Apple' },
  { name: 'Banana' },
  { name: 'Orange' },
  { name: 'Melon' },
]

const typeDefs = `
  type Query {
    items: [Item!]!
  }

  type Item {
    name: String!
  }
`

const resolvers = {
  Query: {
    items: () => sampleItems,
  },
}

const options = { port: 4000 }
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(options, () => console.log('Server is running on localhost:' + options.port))
