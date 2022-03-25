import { Link, Menu, MenuItem, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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

    const [selectedName, setSelectedName] = useState("");
    const [selectedUrl, setSelectedUrl] = useState("");

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
                        {countImg(data)} NFTs with images
                    </Typography>
                    <Menu
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem>
                            <Typography fontSize={24}>
                                Name: {selectedName}
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <a href={selectedUrl} target="_blank">
                                <Link>Open image in new tab</Link>
                            </a>
                        </MenuItem>
                    </Menu>

                    <div>
                        {data.result?.map(
                            // @ts-ignore
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
                                        <img
                                            width={300}
                                            height={300}
                                            style={{ cursor: "pointer" }}
                                            src={imgUrlFormat(value.image)}
                                            onClick={(event: any) => [
                                                setSelectedName(value.name),
                                                setSelectedUrl(value.image),
                                                setAnchorEl(
                                                    event.currentTarget
                                                ),
                                            ]}
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
