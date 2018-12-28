const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload');
const Subscription = require('./resolvers/Subscription');
const config = require('./config');

const resolvers = {
  Query,
  Mutation,
  Subscription
};

console.log(config.prisma_secret === process.env.PRISMA_SECRET);
console.log(process.env.PRISMA_SECRET, config.prisma_secret.toString())

const server = new GraphQLServer({
  typeDefs : './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT || 'http://localhost:4466',
      secret: config.prisma_secret.toString(),
      debug: true, 
    })
  })
});

const opts = {
  port: process.env.PORT,
  cors: {
    credentials: true,
    origin: [process.env.REACT_APP]
  }
};

server.start((opts) => console.log(`Server is running on http://localhost:${process.env.PORT}`));