//src\components\WalletConnectButton\index.tsx

import { useWeb3 } from "@/context/web3Context";
import { formatAddress } from "@/utils/helper";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCallback, useState } from "react";
import styles from "./index.module.css";

export const WalletConnectButton: React.FC = () => {
    //get user logged in wallet address/ens, get connect wallet function
    const { connectWallet, address, ens } = useWeb3();

    const [loading, setLoading] = useState<boolean>(false);

    const connect = useCallback(async () => {
        setLoading(true);
        await connectWallet();
        setLoading(false);
    }, [connectWallet]);

    //if user didn't successfully logged in, we shows the wallet connect button
    //if user logged in, we show the logged in user's ens or edted address
    return (
        <>
            {!address ? (
                <LoadingButton
                    loading={loading}
                    onClick={connect}
                    className={styles.connectWalletButton}
                    sx={{
                        "& .MuiLoadingButton-loadingIndicator": {
                            color: "#000",
                        },
                    }}
                >
                    Connect Wallet
                </LoadingButton>
            ) : (
                <div className={styles.walletInfo}>
                    {formatAddress(address)}
                    <br></br>
                    {ens || null}
                </div>
            )}
        </>
    );
};

WalletConnectButton.displayName = "WalletConnectButton";
