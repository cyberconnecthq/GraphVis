import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../components/Graph/theme";
import { Web3ContextProvider } from "@/context/web3Context";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Web3ContextProvider>
                <Component {...pageProps} />;
            </Web3ContextProvider>
        </ThemeProvider>
    );
}

export default MyApp;
