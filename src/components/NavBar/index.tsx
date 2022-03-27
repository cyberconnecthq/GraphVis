// src\components\NavBar\index.tsx

import { AppMode, useGraph } from "@/context/GraphContext";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
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
                        <Typography fontSize={18} sx={{ fontFamily: "Outfit" }}>
                            USE CYBER MODE
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            setAppMode(AppMode.FocusMode);
                        }}
                    >
                        <Typography fontSize={18} sx={{ fontFamily: "Outfit" }}>
                            USE FOCUS MODE
                        </Typography>
                    </MenuItem>
                </Menu>
                <WalletConnectButton />
            </div>
        </div>
    );
};

NavBar.displayName = "NavBar";
