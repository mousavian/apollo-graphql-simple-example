const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const fetch = require('request-promise');
const { ApolloEngine } = require('apollo-engine');

/**
 * Can be get from https://engine.apollographql.com/
 * More info: https://www.apollographql.com/docs/engine/setup-node.html#api-key
 */
const APOLLO_ENGINE_API_KEY = ''

if (APOLLO_ENGINE_API_KEY === '') {
  throw new Error(`
    "APOLLO_ENGINE_API_KEY" is not set.
    Get it from https://engine.apollographql.com/
    and update src/index.js file
  `)
}


// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query {
    books: [Book],
    posts: [Post]
    post(id: Int!): Post
  }
  type Book { title: String, author: String }
  type Post { userId: Int, id: Int, title: String, body: String }
`;

// The resolvers
const resolvers = {
  Query: {
    books: () => books,
    post: (obj, args, context, info) => {
      return fetch({
        uri: `https://jsonplaceholder.typicode.com/posts/${args.id}`,
        json: true
      })
    },
    posts: () => {
      return fetch({
        uri: 'https://jsonplaceholder.typicode.com/posts',
        json: true
      })
    }
  },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  tracing: true,
  cacheControl: true
}));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const engine = new ApolloEngine({
  apiKey: APOLLO_ENGINE_API_KEY
});


// Start the server
engine.listen({
  port: 8000,
  expressApp: app
}, () => {
  console.log('Go to http://localhost:8000/graphiql to run queries!');
});
