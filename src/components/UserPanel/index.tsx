import { GraphContext, useGraph } from "@/context/GraphContext";
import { useQuery } from "@apollo/client";
import styles from "./index.module.css";
import { GET_IDENTITY } from "@/graphql/queries/get_identity";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Identity } from "../../types/identity";
import { Button, Divider, Switch, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { TabsPanel } from "../TabsPanel";
import { useWeb3 } from "@/context/web3Context";

export const UserPanel: React.FC = () => {
    const { selectAddress, identity, setSelectAddress, setGraphAddress } =
        useGraph();

    const { address } = useWeb3();

    useEffect(() => {
        if (address) {
            setSelectAddress(address);
            setGraphAddress(address);
        }
    }, [address]);

    const handleGraphChange = useCallback(() => {
        setGraphAddress(selectAddress);
    }, [selectAddress]);

    if (!identity) return null;
    return (
        <>
            <div className={styles.container}>
                <div className={styles.upcontainer}>
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
                                width={200}
                                height={200}
                                className={styles.avatar}
                            />
                        </a>
                    ) : (
                        <img
                            src={
                                "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-7.jpg"
                            }
                            alt={""}
                            width={200}
                            height={200}
                            className={styles.avatar}
                        />
                    )}
                    <Typography variant="h4">{identity.ens}</Typography>
                    <LoadingButton
                        sx={{ backgroundColor: "white", marginTop: "10px" }}
                        onClick={handleGraphChange}
                    >
                        EXPLORE this one!!
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

                    {/* Followings & Followers Section */}
                    <div className={styles.followStatus}>
                        <div className={styles.follow}>
                            <Typography>{identity.followerCount}</Typography>
                            <Typography color={"#989898"}>Followers</Typography>
                        </div>
                        <div className={styles.follow}>
                            <Typography>{identity.followingCount}</Typography>
                            <Typography color={"#989898"}>
                                Followings
                            </Typography>
                        </div>
                    </div>

                    {/* Twitter Section */}
                    {identity.social.twitter && (
                        <div className={styles.twitter}>
                            <img src={"/icons/twitter.png"} alt={""} />
                            <a
                                href={
                                    "https://twitter.com/" +
                                    identity.social.twitter
                                }
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                <Button className={styles.twitterButton}>
                                    {" "}
                                    {"@" + identity.social.twitter}
                                </Button>
                            </a>
                        </div>
                    )}

                    {/* Social Section */}
                    <div className={styles.social}>
                        <a
                            href={"https://opensea.io/" + identity.address}
                            target={"_blank"}
                            rel="noreferrer"
                        >
                            <img
                                src={"/icons/opensea.png"}
                                alt={""}
                                className={styles.socialIcon}
                            />
                        </a>
                        <a
                            href={
                                "https://rarible.com/user/" + identity.address
                            }
                            target={"_blank"}
                            rel="noreferrer"
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
                            rel="noreferrer"
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
                            rel="noreferrer"
                        >
                            <img
                                src={"/icons/context.png"}
                                alt={""}
                                className={styles.socialIcon}
                            />
                        </a>
                        <a
                            href={
                                "https://etherscan.io/address/" +
                                identity.address
                            }
                            target={"_blank"}
                            rel="noreferrer"
                        >
                            <img
                                src={"/icons/etherscan.ico"}
                                alt={""}
                                className={styles.socialIcon}
                            />
                        </a>
                    </div>
                </div>
                {/* Follower & Followings Tab Section */}
                <TabsPanel />
            </div>
        </>
    );
};

UserPanel.displayName = "UserPanel";
