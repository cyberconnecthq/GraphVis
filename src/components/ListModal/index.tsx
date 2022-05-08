import { GET_ADDR_CONNECTION_QUERY } from "@/graphql/queries/get_connections";
import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { useEffect } from "react";
import styles from "./index.module.css";

interface Props {
    open: boolean;
    changeOpen: React.Dispatch<React.SetStateAction<boolean>>;
    address: string;
    listType: boolean;
}

export const ListModal = ({ open, changeOpen, address, listType }: Props) => {
    useEffect(() => {
        refetch();
    });
    const handleClose = () => changeOpen(false);

    const { data, refetch, loading, error } = useQuery(
        GET_ADDR_CONNECTION_QUERY,
        {
            variables: {
                address: address,
                first: 50,
                after: "-1",
                namespace: "",
            },
        }
    );

    if (loading) return null;
    if (error) return null;

    const modalType = listType
        ? data.identity.followings.list
        : data.identity.followers.list;

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        overflowY: "scroll",
                        "&::-webkit-scrollbar": {
                            width: "0.3em",
                        },
                        "&::-webkit-scrollbar-track": {
                            boxShadow: "inset 0 0 6px #000",
                            webkitBoxShadow: "inset 0 0 6px #000",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#fff",
                            borderRadius: "20px",
                        },
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 500,
                        height: 600,
                        bgcolor: "#000",
                        border: "1px solid #fff",
                        borderRadius: "5px",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography
                        sx={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1.5em",
                            paddingLeft: "5%",
                            paddingBottom: "10px",
                            width: "100%",
                            borderBottom: "#272727 solid 2px",
                        }}
                    >
                        Top 50 {listType ? "Following" : "Followers"}
                    </Typography>

                    {modalType.map(
                        (
                            value: {
                                avatar: string;
                                address: string;
                                ens: string;
                            },
                            index: number
                        ) => {
                            return (
                                <div
                                    key={index}
                                    className={styles.userInfoSection}
                                >
                                    <div className={styles.avatarSection}>
                                        {value.avatar ? (
                                            <a
                                                rel="noreferrer"
                                                href={
                                                    "https://app.cyberconnect.me/address/" +
                                                    value?.address
                                                }
                                                target={"_blank"}
                                            >
                                                <img
                                                    src={value.avatar}
                                                    alt={""}
                                                    className={styles.avatar}
                                                />
                                            </a>
                                        ) : (
                                            <a
                                                rel="noreferrer"
                                                href={
                                                    "https://app.cyberconnect.me/address/" +
                                                    value?.address
                                                }
                                                target={"_blank"}
                                            >
                                                <img
                                                    src={
                                                        "/Sample_User_Icon.png"
                                                    }
                                                    alt={""}
                                                    className={styles.avatar}
                                                />
                                            </a>
                                        )}
                                    </div>
                                    <div className={styles.userName}>
                                        {value.ens ? (
                                            <Typography
                                                variant="h3"
                                                fontSize={25}
                                                sx={{
                                                    margin: "10px 20px",
                                                    fontFamily: "Outfit",
                                                    color: "#fff",
                                                }}
                                            >
                                                {value.ens}
                                            </Typography>
                                        ) : (
                                            <span></span>
                                        )}
                                        <Typography
                                            variant="h6"
                                            paddingLeft={2}
                                            fontSize={13}
                                            sx={{
                                                color: "gray",
                                                fontFamily: "Outfit",
                                            }}
                                        >
                                            {value?.address}
                                        </Typography>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </Box>
            </Modal>
        </>
    );
};
