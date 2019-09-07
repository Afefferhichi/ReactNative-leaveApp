import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://192.168.43.97:4001/graphql"
  }),
  cache: new InMemoryCache()
});

export default client;
