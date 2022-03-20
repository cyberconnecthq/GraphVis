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

function imgUrlFormat(url) {
    //fixes up the url for a few images which redirect
    if ((url.match(/ipfs/g) || []).length == 3) {
        const new_url = url.replace("/ipfs", "");
        return new_url;
    }

    return url;
}

export const GalleryModal = ({ open, changeOpen, selectAddress }: Props) => {
    const { getNFTBalances, data } = useNFTBalances();

    useEffect(() => {
        getNFTBalances({ params: { address: selectAddress, chain: "eth" } });
    }, [selectAddress]);
    const handleClose = () => changeOpen(false);

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
                        width: 1030,
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

                    <div>
                        {data.result.map(
                            (
                                value: {
                                    image: string;
                                    name: string;
                                },
                                index: number
                            ) => {
                                if (!value.image) return null;
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            color: "#fff",
                                            display: "inline-block",
                                            padding: 10,
                                        }}
                                    >
                                        <a
                                            href={imgUrlFormat(value.image)}
                                            target={"_blank"}
                                        >
                                            <img
                                                width={300}
                                                height={300}
                                                src={imgUrlFormat(value.image)}
                                                alt="Error loading file.
                                                Click to view in new browser tab."
                                            />
                                        </a>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </Box>
            </Modal>
        </>
    );
};
