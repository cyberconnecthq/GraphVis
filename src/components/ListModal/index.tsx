import { GET_ADDR_CONNECTION_QUERY } from "@/graphql/queries/get_connections";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect } from "react";
import "./index.module.css";

const style = {
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
                address: "0x148d59faf10b52063071eddf4aaf63a395f2d41c",
                first: 50,
                after: "-1",
                namespace: "",
            },
        }
    );

    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (
        <>
            <Modal open={props.open} onClose={handleClose}>
                <Box sx={style}>
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
                        Followings
                    </Typography>

                    {data.identity.followings.list.map((value, index) => {
                        return (
                            <Typography
                                id="modal-modal-description"
                                sx={{
                                    mt: 2,
                                    color: "#fff",
                                    paddingLeft: "5%",
                                }}
                                // The key prop is just a placeholder (value needs to be replaced)
                                key={index}
                            >
                                {value.address}
                            </Typography>
                        );
                    })}
                </Box>
            </Modal>
        </>
    );
};
