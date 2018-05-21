import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { execute, makePromise } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import fetch from 'node-fetch';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:8000/graphql',
  fetch
})

const client = new ApolloClient({
  cache,
  link
});


const operation = {
  query: gql`
    query {
      posts {
        title
      }
    }
  `,
  // variables: {}, //optional
  // operationName: {}, //optional
  // context: {}, //optional
  // extensions: {} //optional
};

execute(link, operation).subscribe({
  next: data => console.log(`received data: ${data.data.posts.length}`),
  error: error => console.log(`received error ${error}`),
  complete: () => console.log(`complete`),
})

// For single execution operations, a Promise can be used
makePromise(execute(link, operation))
  .then(data => console.log(`received data ${JSON.stringify(data, null, 2)}`))
  .catch(error => console.log(`received error ${error}`))
