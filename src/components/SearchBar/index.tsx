import { useContext, useState } from "react";
import { TextField } from "@mui/material";
import styles from "./index.module.css";
import { GraphContext } from "@/context/GraphContext";
import { Web3Context } from "@/context/Web3Context";
import { isValidAddr } from "@/utils/helper";

export const SearchBar: React.FC = () => {
    const { setGraphAddress } = useContext(GraphContext);

    const [searchInput, setSearchInput] = useState<string>("");

    const handleInputChange = async (value: string) => {
        setSearchInput(value);

        if (isValidAddr(value)) {
            setGraphAddress(value);
            console.log(searchInput);
        }
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
