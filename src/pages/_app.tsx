import { GraphContextProvider } from "@/context/GraphContext";
import { Web3ContextProvider } from "@/context/web3Context";
import client from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { StyledEngineProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import "../../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <StyledEngineProvider injectFirst>
            <ApolloProvider client={client}>
                <Web3ContextProvider>
                    <GraphContextProvider>
                        <MoralisProvider
                            appId="xr9YIKwBbD3j8OzCwZ7MJGfBEQUC2XIyhR6wpAQI"
                            serverUrl="https://fnhwzxgt6aou.usemoralis.com:2053/server"
                        >
                            <Component {...pageProps} />
                        </MoralisProvider>
                    </GraphContextProvider>
                </Web3ContextProvider>
            </ApolloProvider>
        </StyledEngineProvider>
    );
}

export default MyApp;
