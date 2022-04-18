// src\pages\_app.tsx

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
                            serverUrl={
                                process.env.NEXT_PUBLIC_MORALIS_SERVER_URL!
                            }
                            appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID!}
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
