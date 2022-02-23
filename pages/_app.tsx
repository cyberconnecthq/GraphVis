import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ContextProvider } from "../context/Web3Context";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/client";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Web3ContextProvider>
                <Component {...pageProps} />
            </Web3ContextProvider>
        </ApolloProvider>
    );
}

export default MyApp;
