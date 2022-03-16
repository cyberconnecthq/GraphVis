import { GET_ADDR_CONNECTION_QUERY } from "@/graphql/queries/get_connections";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect } from "react";
const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
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
        <div>
            <Modal open={props.open} onClose={handleClose}>
                <Box sx={style}>
                    {data.identity.followings.list.map((value, index) => {
                        return (
                            <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                            >
                                {value.address}
                            </Typography>
                        );
                    })}
                </Box>
            </Modal>
        </div>
    );
};
