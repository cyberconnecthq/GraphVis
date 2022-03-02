import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./index.module.css";
import { useGraph } from "@/context/GraphContext";

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
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }} className={styles.container}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="scrollable"
                    sx={{ border: "white solid", bgcolor: "white" }}
                >
                    <Tab label="Followers" {...a11yProps(0)} />
                    <Tab label="Followings" {...a11yProps(1)} />
                    <Tab label="Assets" {...a11yProps(2)} />
                    <Tab label="Assets" {...a11yProps(3)} />
                    <Tab label="Assets" {...a11yProps(4)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {connections?.identity.followers.list.map((user) => {
                    return (
                        <Typography>
                            {connections?.identity.followers.list}
                        </Typography>
                    );
                })}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {connections?.identity.followings.list.map((user) => {
                    return <Typography>{user.address}</Typography>;
                })}
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography>Item Onesssss</Typography>
            </TabPanel>
        </Box>
    );
};

TabsPanel.displayName = "TabsPanel";
