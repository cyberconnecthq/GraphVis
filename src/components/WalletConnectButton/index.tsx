import { useWeb3 } from "@/context/web3Context";
import { formatAddress } from "@/utils/helper";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCallback, useState } from "react";
import styles from "./index.module.css";

export const WalletConnectButton: React.FC = () => {
    const { connectWallet, address, ens } = useWeb3();

    const [loading, setLoading] = useState<boolean>(false);

    const connect = useCallback(async () => {
        setLoading(true);
        await connectWallet();
        setLoading(false);
    }, [connectWallet]);

    return (
        <>
            {!address ? (
                <LoadingButton
                    loading={loading}
                    onClick={connect}
                    className={styles.connectWalletButton}
                    sx={{
                        "& .MuiLoadingButton-loadingIndicator": {
                            color: "#ffffff",
                        },
                    }}
                >
                    Connect Wallet
                </LoadingButton>
            ) : (
                <div className={styles.userAddress}>
                    Address:
                    {ens || formatAddress(address)}
                </div>
            )}
        </>
    );
};

WalletConnectButton.displayName = "WalletConnectButton";
