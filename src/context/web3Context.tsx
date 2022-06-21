import CyberConnect from "@cyberlab/cyberconnect";
import { ethers } from "ethers";
import React, { useCallback, useContext, useState } from "react";
import Web3Modal from "web3modal";

interface Web3ContextInterface {
    connectWallet: () => Promise<void>;
    address: string;
    ens: string | null;
    cyberConnect: CyberConnect | null;
    getAddressByEns: (ens: string) => Promise<string | null>;
}

// create Context to pass data to different components
export const Web3Context = React.createContext<Web3ContextInterface>({
    connectWallet: async () => undefined, //connect wallet function
    address: "", // user's signed in address
    ens: "", //user's signed in ens
    cyberConnect: null, //to interact with cyberconnect, e.g. follow/unfollow a address, optional here since we didn't add follow/unfollow button
    getAddressByEns: async () => null, //get Address from ens function
});

export const Web3ContextProvider: React.FC = ({ children }) => {
    const [address, setAddress] = useState<string>("");
    const [ens, setEns] = useState<string | null>("");
    const [cyberConnect, setCyberConnect] = useState<CyberConnect | null>(null);

    const initCyberConnect = useCallback((provider: any) => {
        const cyberConnect = new CyberConnect({
            provider,
            namespace: "CyberGraph",
        });

        setCyberConnect(cyberConnect);
    }, []);

    // connectWallet fuction to use Web3Modal configuration for enabling wallet access
    const connectWallet = useCallback(async () => {
        // init Web3Modal
        const web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: true,
            providerOptions: {},
        });

        const instance = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(instance);
        const signer = provider.getSigner();
        // get the address which user used to sign in
        const address = await signer.getAddress();
        // get the ens which user address associated with
        const ens = await getEnsByAddress(provider, address);

        setAddress(address);
        setEns(ens);
        initCyberConnect(provider.provider);
    }, [initCyberConnect]);

    // the function to get users' address from their ens
    async function getAddressByEns(ens: string) {
        const address = await ethers.providers
            .getDefaultProvider()
            .resolveName(ens);
        return address;
    }

    // the function to get users' ens from their address
    async function getEnsByAddress(
        provider: ethers.providers.Web3Provider,
        address: string
    ) {
        const ens = await provider.lookupAddress(address);
        return ens;
    }

    return (
        <Web3Context.Provider
            value={{
                connectWallet,
                address,
                ens,
                cyberConnect,
                getAddressByEns,
            }}
        >
            {children}
        </Web3Context.Provider>
    );
};

export const useWeb3 = () => {
    const web3 = useContext(Web3Context);
    return web3;
};
