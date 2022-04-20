// src\components\NavBar\index.tsx

import { AppMode, useGraph } from "@/context/GraphContext";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import SettingsIcon from "@mui/icons-material/Settings";
import {
    Box,
    Button,
    Link,
    Menu,
    MenuItem,
    Modal,
    Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SearchBar } from "../SearchBar";
import { WalletConnectButton } from "../WalletConnectButton";
import styles from "./index.module.css";

export const NavBar: React.FC = () => {
    const router = useRouter();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [modalOpen, setModalOpen] = useState(false);
    const handleModalClose = () => {
        setModalOpen(false);
    };
    const handleModalClick = () => {
        setModalOpen(true);
    };

    const { setAppMode } = useGraph();

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <Image
                    src="/CyberGraph-logo.png"
                    // layout="fill"
                    width={210}
                    height={30}
                    className={styles.logo}
                    alt="Cyber Graph"
                    onClick={() => {
                        router.push("/");
                    }}
                />
            </div>
            <SearchBar />
            <div className={styles.rightPanel}>
                <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleModalClick}
                >
                    <QuestionMarkIcon
                        style={{
                            color: "FFFFFF",
                            fontSize: "40px",
                        }}
                    />
                </Button>
                <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    <SettingsIcon
                        style={{
                            color: "FFFFFF",
                            fontSize: "40px",
                        }}
                    />
                </Button>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            setAppMode(AppMode.CyberMode);
                        }}
                    >
                        <Typography fontSize={24}>Use cyber mode</Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            setAppMode(AppMode.FocusMode);
                        }}
                    >
                        <Typography fontSize={24}>Use focus mode</Typography>
                    </MenuItem>
                </Menu>
                <Modal open={modalOpen} onClose={handleModalClose}>
                    <Box
                        sx={{
                            position: "absolute",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
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
                            overflowY: "scroll",
                        }}
                    >
                        {" "}
                        <Typography
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "2.5em",
                                paddingLeft: "5%",
                                paddingBottom: "10px",
                                width: "100%",
                                borderBottom: "#272727 solid 2px",
                            }}
                        >
                            Help
                        </Typography>
                        <Typography
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "2em",
                                paddingLeft: "5%",
                                paddingTop: "10px",
                                width: "100%",
                            }}
                        >
                            About
                        </Typography>
                        <Typography
                            sx={{
                                color: "#999",
                                fontSize: "1.2em",
                                paddingLeft: "5%",
                                paddingTop: "8px",
                                width: "100%",
                            }}
                        >
                            CyberGraph is a 3D-graph based, user based social
                            connection explorer powered by{" "}
                            <Link
                                href={"http://cyberconnect.me/"}
                                rel="noopener"
                                target="_blank"
                            >
                                CyberConnect
                            </Link>
                            .{" "}
                        </Typography>
                        <Typography
                            sx={{
                                color: "#999",
                                fontSize: "1.2em",
                                paddingLeft: "5%",
                                paddingTop: "8px",
                                width: "100%",
                            }}
                        >
                            It has some cool features like 3d node graph,
                            dynamic loading bar, immersive user experience,
                            cyber mode(10-hops friendship network display) and
                            focus mode(aggregated connection display)
                        </Typography>
                        <Typography
                            sx={{
                                color: "#999",
                                fontSize: "1.2em",
                                paddingLeft: "5%",
                                paddingTop: "8px",
                                width: "100%",
                            }}
                        >
                            This is an open-sourced project. Please feel free to
                            check and contribute on the{" "}
                            <Link
                                href={
                                    "https://github.com/cyberconnecthq/CyberGraph/"
                                }
                                rel="noopener"
                                target="_blank"
                            >
                                GitHub
                            </Link>{" "}
                            page.
                        </Typography>
                        <Typography
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: "2em",
                                paddingLeft: "5%",
                                paddingTop: "10px",
                                width: "100%",
                            }}
                        >
                            Controls
                        </Typography>
                        <Typography
                            sx={{
                                color: "#999",
                                fontSize: "1.5em",
                                paddingLeft: "5%",
                                paddingTop: "8px",
                                width: "100%",
                            }}
                        >
                            Left-click: rotate
                        </Typography>
                        <Typography
                            sx={{
                                color: "#999",
                                fontSize: "1.5em",
                                paddingLeft: "5%",
                                paddingTop: "8px",
                                width: "100%",
                            }}
                        >
                            Right-click: pan
                        </Typography>
                        <Typography
                            sx={{
                                color: "#999",
                                fontSize: "1.5em",
                                paddingLeft: "5%",
                                paddingTop: "8px",
                                width: "100%",
                            }}
                        >
                            Mouse-wheel: zoom
                        </Typography>
                    </Box>
                </Modal>
                <WalletConnectButton />
            </div>
        </div>
    );
};

NavBar.displayName = "NavBar";
