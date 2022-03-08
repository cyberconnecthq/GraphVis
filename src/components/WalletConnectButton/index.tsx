import { useState, useCallback } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useWeb3 } from "@/context/web3Context";
import { formatAddress } from "@/utils/helper";
import styles from "./index.module.css";
import { useGraph } from "@/context/GraphContext";

export const WalletConnectButton: React.FC = () => {
    const { connectWallet, address, ens } = useWeb3();
    const { identity, setGraphAddress } = useGraph();
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
                <div className={styles.userInfo}>
                    <div className={styles.avatarSection}>
                        {identity.avatar ? (
                            <a
                                rel="noreferrer"
                                href={
                                    "https://app.cyberconnect.me/address/" +
                                    identity?.address
                                }
                                target={"_blank"}
                            >
                                <img
                                    src={identity.avatar}
                                    alt={""}
                                    width={40}
                                    height={40}
                                    className={styles.avatar}
                                    onClick={() => setGraphAddress(address)}
                                />
                            </a>
                        ) : (
                            <a onClick={() => setGraphAddress(address)}>
                                <img
                                    src={"/Sample_User_Icon.png"}
                                    alt={""}
                                    width={40}
                                    height={40}
                                    className={styles.avatar}
                                />
                            </a>
                        )}
                    </div>
                    <div className={styles.userAddress}>
                        {ens || formatAddress(address)}
                    </div>
                </div>
            )}
        </>
    );
};

WalletConnectButton.displayName = "WalletConnectButton";
