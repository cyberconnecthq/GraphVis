// src\pages\_app.tsx

import { GraphContextProvider } from "@/context/GraphContext";
import { Web3ContextProvider } from "@/context/web3Context";
import client from "@/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { StyledEngineProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Script from "next/script";
import { MoralisProvider } from "react-moralis";
import "../../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div>
            <Script
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <Script id="google-analytics-script" strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                            page_path: window.location.pathname,
                    });
                  `}
            </Script>

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
        </div>
    );
}

export default MyApp;
