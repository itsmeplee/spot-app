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

console.log(process.env.PRISMA_ENDPOINT);

const server = new GraphQLServer({
  typeDefs : './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT || 'http://127.0.0.1:4466',
      secret: process.env.PRISMA_SECRET.toString() || config.prisma_secret.toString(),
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

server.start((opts) => console.log(`Server is running within the docker container and locally on http://localhost:${process.env.EXPOSED_PORT}`));