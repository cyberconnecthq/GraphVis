import { GET_ADDR_CONNECTION_QUERY } from "@/graphql/queries/get_connections";
import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { useEffect } from "react";
import styles from "./index.module.css";

const modalStyle = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
        width: "0.3em",
    },
    "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
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
};

export const ListModal: React.FC = (props) => {
    useEffect(() => {
        refetch();
    });
    const handleClose = () => props.changeOpen(false);

    const { loading, error, data, refetch } = useQuery(
        GET_ADDR_CONNECTION_QUERY,
        {
            variables: {
                address: props.address,
                first: 50,
                after: "-1",
                namespace: "",
            },
        }
    );

    const test = props.listType
        ? data.identity.followings.list
        : data.identity.followers.list;

    return (
        <>
            <Modal open={props.open} onClose={handleClose}>
                <Box sx={modalStyle}>
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
                        Top 50 {props.listType ? "Followings" : "Followers"}
                    </Typography>

                    {test.map((value, index) => {
                        return (
                            <div key={index} className={styles.userInfoSection}>
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
                                                src={"/Sample_User_Icon.png"}
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
                                        <Typography
                                            variant="h3"
                                            fontSize={25}
                                            sx={{
                                                margin: "10px 20px",
                                                fontFamily: "Outfit",
                                                color: "#fff",
                                            }}
                                        >
                                            No ENS
                                        </Typography>
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
                    })}
                </Box>
            </Modal>
        </>
    );
};
