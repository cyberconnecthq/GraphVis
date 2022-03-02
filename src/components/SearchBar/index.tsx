import { useContext, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./index.module.css";
import { GraphContext } from "@/context/GraphContext";
import { isValidAddr } from "@/utils/helper";

export const SearchBar: React.FC = () => {
    const { graphAddress, setGraphAddress } = useContext(GraphContext);

    const [searchInput, setSearchInput] = useState<string>("");

    const handleInputChange = () => {
        if (isValidAddr(searchInput)) {
            setGraphAddress(searchInput);
        }
    };

    useEffect(() => {
        handleInputChange;
    }, [graphAddress]);

    return (
        <form onSubmit={handleInputChange}>
            <input
                className={styles.textField}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by ENS / address"
                value={searchInput}
            />
        </form>
    );
};

SearchBar.displayName = "SearchBar";
