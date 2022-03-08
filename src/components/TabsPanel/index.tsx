import { useGraph } from "@/context/GraphContext";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import * as React from "react";
import styles from "./index.module.css";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export const TabsPanel: React.FC = () => {
    const [value, setValue] = React.useState(0);
    const { connections } = useGraph();

    const handleChange = (value: number) => {
        setValue(value);
    };

    return (
        <Box sx={{ width: "100%" }} className={styles.container}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    aria-label="basic tabs example"
                    variant="scrollable"
                    sx={{ border: "white solid", bgcolor: "white" }}
                >
                    <Tab label="Followers" {...a11yProps(0)} />
                    <Tab label="Followings" {...a11yProps(1)} />
                    <Tab label="Tokens" {...a11yProps(2)} />
                    <Tab label="NFTs" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {connections?.identity.followers.list.map((user: any) => {
                    return (
                        <Typography key={user.address}>
                            {user.address}
                        </Typography>
                    );
                })}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className="infoPanel">
                    {connections?.identity.followings.list.map((user: any) => {
                        return (
                            <Typography key={user.address}>
                                {user.address}
                            </Typography>
                        );
                    })}
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography>Coming soon!</Typography>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Typography>Coming soon!</Typography>
            </TabPanel>
        </Box>
    );
};

TabsPanel.displayName = "TabsPanel";
