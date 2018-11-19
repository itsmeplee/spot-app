const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload');
const Subscription = require('./resolvers/Subscription');

const resolvers = {
  Query,
  Mutation,
  Subscription
};

const dotenv = require('dotenv')
const result = dotenv.config();

if (result.error) {
  throw result.error;
}

console.log(result.parsed);

const server = new GraphQLServer({
  typeDefs : './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
      debug: true,
    })
  })
});

const opts = {
  port: 80,
  cors: {
    credentials: true,
    origin: [process.env.REACT_APP]
  }
};

server.start((opts) => console.log(`Server is running on http://localhost:4000`));