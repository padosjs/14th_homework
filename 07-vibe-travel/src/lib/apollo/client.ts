import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { authLink } from "./auth-link";

const uploadLink = createUploadLink({
  uri: "http://main-practice.codebootcamp.co.kr/graphql",
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache()
});

export default client;
