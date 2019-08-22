import { ApolloClient, HttpLink, InMemoryCache, concat } from 'apollo-boost';


export default client = new ApolloClient({
    link: { uri: "https://localhost:5001/graphql" },
    cache: new InMemoryCache()
});





