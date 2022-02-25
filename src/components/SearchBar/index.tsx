import * as React from "react";

import { useState, useCallback } from "react";
import { TextField } from "@mui/material";
import styles from "./index.module.css";

export const SearchBar: React.FC = () => {
    const [searchInput, setSearchInput] = useState<string>("");

    const handleInputChange = async (value: string) => {
        setSearchInput(value);

        if (isValidAddr(value) && address) {
            setSearchLoading(true);
            await fetchSearchAddrInfo(value);
        }
        setSearchLoading(false);
    };

    return (
        <TextField
            className={styles.textField}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search by ENS / address"
        />
    );
};

SearchBar.displayName = "SearchBar";
