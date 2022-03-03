import { useContext, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./index.module.css";
import { GraphContext } from "@/context/GraphContext";
import { isValidAddr } from "@/utils/helper";
import { useWeb3 } from "@/context/web3Context";

export const SearchBar: React.FC = () => {
    const { graphAddress, setGraphAddress } = useContext(GraphContext);
    const { getAddressByEns } = useWeb3();
    const [value, setValue] = useState("");

    const handleInputChange = async (e: { target: { value: string } }) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (newValue != "" && newValue.length < 64) {
            try {
                const ens = await getAddressByEns(newValue);
                if (ens) {
                    setGraphAddress(ens);
                } else if (newValue.length == 42) {
                    setGraphAddress(newValue);
                }
            } catch (error) {}
        }
    };

    return (
        <TextField
            className={styles.textField}
            onChange={handleInputChange}
            placeholder="Search by ENS / address"
            sx={{ color: "white" }}
        />
    );
};

SearchBar.displayName = "SearchBar";
