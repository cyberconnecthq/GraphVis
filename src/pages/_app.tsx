import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../components/Graph/theme";
import { Web3ContextProvider } from "@/context/web3Context";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";
import { GraphContextProvider } from "context/GraphContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <ApolloProvider client={client}>
                <Web3ContextProvider>
                    <GraphContextProvider>
                        <Component {...pageProps} />
                    </GraphContextProvider>
                </Web3ContextProvider>
            </ApolloProvider>
        </ThemeProvider>
    );
}

export default MyApp;
