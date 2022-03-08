import { useGraph } from "@/context/GraphContext";
import { useWeb3 } from "@/context/web3Context";
import { isValidAddr } from "@/utils/helper";
import styles from "./index.module.css";

export const SearchBar: React.FC = () => {
    const { setGraphAddress, setSelectAddress } = useGraph();
    const { getAddressByEns } = useWeb3();

    const handleInputChange = async (e: { target: { value: string } }) => {
        const newValue = e.target.value;
        if (newValue.slice(-3) === "eth") {
            try {
                const ensAddr = await getAddressByEns(newValue);
                if (ensAddr) {
                    setGraphAddress(ensAddr);
                    setSelectAddress(ensAddr);
                }
            } catch (error) {}
        } else if (isValidAddr(newValue)) {
            setGraphAddress(newValue);
            setSelectAddress(newValue);
        }
    };

    return (
        <input
            className={styles.textField}
            onChange={handleInputChange}
            placeholder="Search by ENS / address"
        />
    );
};

SearchBar.displayName = "SearchBar";
