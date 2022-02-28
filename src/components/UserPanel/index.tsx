import { GraphContext } from "@/context/GraphContext";
import styles from "./index.module.css";
import { useContext, useEffect, useState } from "react";

export const UserPanel: React.FC = () => {
    const { graphAddress } = useContext(GraphContext);

    return <div className={styles.container}>UserPanel</div>;
};

UserPanel.displayName = "UserPanel";
