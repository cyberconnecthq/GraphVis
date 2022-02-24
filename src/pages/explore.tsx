import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import { DEFAULT_ADDRESS } from "../config/config";
import { useQuery } from "@apollo/client";
import { GET_IDENTITY } from "../graphql/queries/get_identity";
import { Identity } from "../type/identity";

const Explore: NextPage = () => {
    const [identity, setIdentity] = useState<Identity | null>(null);
    const identityData = useQuery(GET_IDENTITY, {
        variables: {
            address: DEFAULT_ADDRESS,
        },
    }).data;

    useEffect(() => {
        if (identityData) {
            // setIdentity(identityData.identity);
            console.log("*************");
            console.log(identityData);
            console.log("*************");
        }
    }, [identityData]);

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography>CyberGraph</Typography> <SearchIcon />{" "}
                    <InputBase placeholder="Input address or ens..." />
                    <Button color="inherit">MainSite</Button>
                    <Button color="inherit">Doc</Button>
                    <Button color="inherit">About</Button>
                    <Avatar>0x</Avatar>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Explore;
