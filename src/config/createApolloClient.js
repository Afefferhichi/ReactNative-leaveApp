import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost';

export default client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://192.168.43.97:4001/graphql'
  }),
  cache: new InMemoryCache()
});




