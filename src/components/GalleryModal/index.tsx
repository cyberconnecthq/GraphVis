import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { useEffect } from "react";
import { useNFTBalances } from "react-moralis";

interface Props {
    open: boolean;
    changeOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectAddress: string;
}

export const GalleryModal = ({ open, changeOpen, selectAddress }: Props) => {
    const { getNFTBalances, data } = useNFTBalances();

    useEffect(() => {
        getNFTBalances({ params: { address: selectAddress } });
    }, [selectAddress]);
    const handleClose = () => changeOpen(false);

    const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    if (!data) return null;
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
                        width: 1000,
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
                        NFTs
                    </Typography>

                    {data.result.map(
                        (
                            value: {
                                image: string;
                                name: string;
                            },
                            index: number
                        ) => {
                            return (
                                <div key={index} style={{ color: "#fff" }}>
                                    Name: {value.name}
                                    <img src={value.image} />
                                </div>
                            );
                        }
                    )}
                </Box>
            </Modal>
        </>
    );
};
