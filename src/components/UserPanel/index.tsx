import { GraphContext, useGraph } from "@/context/GraphContext";
import { useQuery } from "@apollo/client";
import styles from "./index.module.css";
import { GET_IDENTITY } from "@/graphql/queries/get_identity";
import { useContext, useEffect, useState } from "react";
import { Identity } from "../../utils/types";

import { DEFAULT_ADDRESS } from "../../config/config";
import { Button, Divider, Typography } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { margin } from "@mui/system";
import { LoadingButton } from "@mui/lab";

export const UserPanel: React.FC<{ address: string }> = ({
    address,
}: {
    address: string;
}) => {
    // const graphAddress = "0x148d59faf10b52063071eddf4aaf63a395f2d41c";
    const { selectAddress, setGraphAddress } = useGraph();
    const [identity, setIdentity] = useState<Identity | null>(null);

    const identityData = useQuery(GET_IDENTITY, {
        variables: {
            address: selectAddress,
        },
    }).data;

    useEffect(() => {
        if (identityData) {
            setIdentity(identityData.identity);
        }
    }, [identityData]);

    if (!identity) return null;
    return (
        <div className={styles.container}>
            {identity.avatar && (
                <a
                    href={
                        "https://app.cyberconnect.me/address/" +
                        identity?.address
                    }
                    target={"_blank"}
                >
                    <img
                        src={identity.avatar}
                        alt={""}
                        width={200}
                        height={200}
                        className={styles.avatar}
                    />
                </a>
            )}
            <Typography variant="h4">{identity.ens}</Typography>
            <LoadingButton sx={{ backgroundColor: "white" }}>
                Follow
            </LoadingButton>
            <LoadingButton
                sx={{ backgroundColor: "white" }}
                onClick={() => setGraphAddress(selectAddress)}
            >
                Check this one!!
            </LoadingButton>
            <Typography
                variant="h5"
                padding={2}
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                Address:{" "}
                <Typography paddingLeft={2} sx={{ color: "gray" }}>
                    {identity?.address}
                </Typography>
            </Typography>

            <div className={styles.followStatus}>
                <div className={styles.follow}>
                    <Typography>{identity.followerCount}</Typography>
                    <Typography color={"#989898"}>Followers</Typography>
                </div>
                <div className={styles.follow}>
                    <Typography>{identity.followingCount}</Typography>
                    <Typography color={"#989898"}>Followings</Typography>
                </div>
            </div>

            {identity.social.twitter && (
                <div className={styles.twitter}>
                    <img src={"/icons/twitter.png"} alt={""} />
                    <a
                        href={"https://twitter.com/" + identity.social.twitter}
                        target={"_blank"}
                    >
                        <Button className={styles.twitterButton}>
                            {" "}
                            {"@" + identity.social.twitter}
                        </Button>
                    </a>
                </div>
            )}

            <div className={styles.social}>
                <a
                    href={"https://opensea.io/" + identity.address}
                    target={"_blank"}
                >
                    <img
                        src={"/icons/opensea.png"}
                        alt={""}
                        className={styles.socialIcon}
                    />
                </a>
                <a
                    href={"https://rarible.com/user/" + identity.address}
                    target={"_blank"}
                >
                    <img
                        src={"/icons/rarible.png"}
                        alt={""}
                        className={styles.socialIcon}
                    />
                </a>
                <a
                    href={"https://foundation.app/" + identity.address}
                    target={"_blank"}
                >
                    <img
                        src={"/icons/foundation.png"}
                        alt={""}
                        className={styles.socialIcon}
                    />
                </a>
                <a
                    href={"https://context.app/" + identity.address}
                    target={"_blank"}
                >
                    <img
                        src={"/icons/context.png"}
                        alt={""}
                        className={styles.socialIcon}
                    />
                </a>
                <a
                    href={"https://etherscan.io/address/" + identity.address}
                    target={"_blank"}
                >
                    <img
                        src={"/icons/etherscan.ico"}
                        alt={""}
                        className={styles.socialIcon}
                    />
                </a>
            </div>
        </div>
    );
};

UserPanel.displayName = "UserPanel";