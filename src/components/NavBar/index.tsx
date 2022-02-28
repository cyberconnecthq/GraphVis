import Image from "next/image";
import { SearchBar } from "../SearchBar";
import styles from "./index.module.css";

export const NavBar: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <Image
                    src="/CyberGraph-logo.png"
                    // layout="fill"
                    width={200}
                    height={30}
                    className={styles.logo}
                    alt="Cyber Graph"
                />
            </div>
            <SearchBar />
        </div>
    );
};

NavBar.displayName = "NavBar";
