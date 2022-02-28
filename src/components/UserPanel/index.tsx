import { GraphContext, useGraph } from "@/context/GraphContext";
import { useQuery } from "@apollo/client";
import styles from "./index.module.css";
import { GET_IDENTITY } from "@/graphql/queries/get_identity";
import { useContext, useEffect, useState } from "react";
import { Identity } from "../../utils/types";

import { DEFAULT_ADDRESS } from "../../config/config";
import { Divider, Typography } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { margin } from "@mui/system";
import { LoadingButton } from "@mui/lab";

export const UserPanel: React.FC = ({ address }: { address: string }) => {
    const graphAddress = "0x148d59faf10b52063071eddf4aaf63a395f2d41c";
    const [identity, setIdentity] = useState<Identity | null>(null);

    const identityData = useQuery(GET_IDENTITY, {
        variables: {
            address: graphAddress,
        },
    }).data;

    useEffect(() => {
        if (identityData) {
            setIdentity(identityData.identity);
            console.log(identityData);
        }
    }, [identityData]);

    if (!identity) return null;
    return (
        <div className={styles.container}>
            {identity.avatar && (
                <a
                    href={
                        "https://app.cyberconnect.me/address/" +
                        identity?.address
                    }
                    target={"_blank"}
                >
                    <img
                        src={identity.avatar}
                        alt={""}
                        width={200}
                        height={200}
                        className={styles.avatar}
                    />
                </a>
            )}
            <Typography variant="h4">{identity.ens}</Typography>
            <LoadingButton sx={{ backgroundColor: "white" }}>
                Follow
            </LoadingButton>
            <Typography
                variant="h5"
                padding={2}
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                Address:{" "}
                <Typography paddingLeft={2} sx={{ color: "gray" }}>
                    {identity?.address}
                </Typography>
            </Typography>
        </div>
    );
};

UserPanel.displayName = "UserPanel";
