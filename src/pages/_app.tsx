// src\pages\_app.tsx

import { GraphContextProvider } from "@/context/GraphContext";
import { Web3ContextProvider } from "@/context/web3Context";
import client from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { StyledEngineProvider } from "@mui/material";
import type { AppProps } from "next/app";
import "../../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ApolloProvider client={client}>
        <Web3ContextProvider>
          <GraphContextProvider>
            <Component {...pageProps} />
          </GraphContextProvider>
        </Web3ContextProvider>
      </ApolloProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
