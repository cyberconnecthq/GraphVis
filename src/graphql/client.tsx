// src\graphql\client.tsx

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { CYBERCONNECT_ENDPOINT } from "../config/config";

const client = new ApolloClient({
    uri: CYBERCONNECT_ENDPOINT,
    cache: new InMemoryCache(),
});

export default client;
