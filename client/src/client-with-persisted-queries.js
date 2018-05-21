/*
 * https://www.apollographql.com/docs/engine/auto-persisted-queries.html
 */

import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import fetch from 'node-fetch';
import gql from 'graphql-tag';

const link = createPersistedQueryLink({
  useGETForHashedQueries: true
}).concat(createHttpLink({ uri: "http://localhost:8000/graphql", fetch }));

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});


client.query({
  query: gql`
    query ($id: Int!) {
      post (id: $id) {
        title
        id
      }
    }`,
  variables: {
    id: 2,
    blabla: 234
  }
}).then(data => {
  console.log(data.data)
})


