import React, { useState, useEffect, createContext, useCallback } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import CyberConnect from "@cyberlab/cyberconnect";

interface Web3ContextInterface {
    cyberConnect: CyberConnect | null;
}

export const Web3Context = createContext<Web3ContextInterface>({
    cyberConnect: null,
});

export const Web3ContextProvider: React.FC = ({ children }) => {
    const [cyberConnect, setCyberConnect] = useState<CyberConnect | null>(null);
    const [provider, setProvider] =
        useState<ethers.providers.JsonRpcProvider | null>(null);
    const [ens, setEns] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [web3Modal, setWeb3Modal] = useState<Web3Modal | undefined>(
        undefined
    );

    const disconnectWallet = useCallback(async () => {
        setEns("");
        setAddress("");
    }, []);

    const subscribeProvider = useCallback(
        // @ts-ignore
        (provider: Web3Provider) => {
            // Subscribe to accountsChanged
            provider.on("accountsChanged", (accounts: string[]) => {
                disconnectWallet();
            });

            // Subscribe to chainsChanged
            provider.on("chainChanged", (chainId: number) => {
                disconnectWallet();
                location.reload();
            });

            // Subscribe to walletDisconnect
            provider.on(
                "disconnect",
                (error: { code: number; message: string }) => {
                    disconnectWallet();
                }
            );
        },
        [disconnectWallet]
    );

    const initCyberConnect = useCallback((provider: any) => {
        const cyberConnect = new CyberConnect({
            provider,
            namespace: "CyberConnect",
        });
        cyberConnect.authenticate();
        setCyberConnect(cyberConnect);
    }, []);

    // useEffect(() => {
    //   const web3Modal = new Web3Modal({
    //     network: 'mainnet',
    //     cacheProvider: true,
    //     // providerOptions,
    //   });

    //   setWeb3Modal(web3Modal);
    // });

    return (
        <Web3Context.Provider
            value={{
                cyberConnect,
            }}
        >
            {children}
        </Web3Context.Provider>
    );
};
