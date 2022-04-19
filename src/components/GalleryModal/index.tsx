import { Box, Link, Menu, Modal, Typography } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNFTBalances } from "react-moralis";

interface Props {
    open: boolean;
    changeOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectAddress: string;
}

function imgUrlFormat(url: string) {
    //fixes up the url for a few images which redirect
    if ((url.match(/ipfs/g) || []).length == 3) {
        const new_url = url.replace("/ipfs", "");
        return new_url;
    }

    return url;
}

// @ts-ignore
function countImg(data) {
    let imgCount = 0;
    data.result.map((value: { image: string }) => {
        if (value.image) {
            imgCount++;
        }
    });
    return imgCount;
}

export const GalleryModal = ({ open, changeOpen, selectAddress }: Props) => {
    const { getNFTBalances, data } = useNFTBalances();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        getNFTBalances({ params: { address: selectAddress, chain: "eth" } });
    }, [getNFTBalances, selectAddress]);

    const handleClose = () => changeOpen(false);

    const [selectedValue, setSelectedValue] = useState(Object);

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
                        width: 1040,
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
                        Found {countImg(data)} NFTs with images
                    </Typography>
                    <Menu
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                        sx={{
                            "& .MuiMenu-paper": {
                                backgroundColor: "#222",
                                marginRight: 20,
                                marginLeft: 10,
                                padding: 5,
                            },
                        }}
                    >
                        {selectedValue?.error && (
                            <Link
                                onClick={() =>
                                    window.open(selectedValue?.external_url)
                                }
                            >
                                Error? Open in new tab
                            </Link>
                        )}
                        <Typography color={"#fff"} fontSize={32}>
                            {selectedValue?.name}
                        </Typography>
                        <Typography color={"#999"} fontSize={18}>
                            {selectedValue?.description}
                        </Typography>
                        {selectedValue?.external_url && (
                            <Link
                                onClick={() =>
                                    window.open(selectedValue?.image)
                                }
                            >
                                Learn more
                            </Link>
                        )}
                    </Menu>

                    <div>
                        {data.result?.map(
                            // @ts-ignore
                            (
                                value: {
                                    image: string;
                                    name: string;
                                    metadata: any;
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
                                        <img
                                            width={300}
                                            height={300}
                                            style={{ cursor: "pointer" }}
                                            src={imgUrlFormat(value.image)}
                                            onClick={(event: any) => [
                                                setSelectedValue(
                                                    value.metadata
                                                ),
                                                setAnchorEl(
                                                    event.currentTarget
                                                ),
                                            ]}
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null; // prevents looping
                                                currentTarget.src =
                                                    "data:image/png;base64,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"; //error image
                                                value.metadata.error = true;
                                                setSelectedValue(
                                                    value.metadata
                                                );
                                            }}
                                        />
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
