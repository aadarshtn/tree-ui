import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Create the Apollo Client instance
const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000", // The URL of your GraphQL server
  }),
  cache: new InMemoryCache(), // In-memory caching for better performance
});

export default client;
