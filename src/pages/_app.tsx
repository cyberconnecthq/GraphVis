import { GraphContextProvider } from "@/context/GraphContext";
import { Web3ContextProvider } from "@/context/web3Context";
import client from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import "../../styles/globals.css";
import theme from "../components/Graph/theme";

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
