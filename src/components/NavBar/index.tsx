import Image from "next/image";
import { SearchBar } from "../SearchBar";
import { WalletConnectButton } from "../WalletConnectButton";
import styles from "./index.module.css";
import { useRouter } from "next/router";

export const NavBar: React.FC = () => {
    const router = useRouter();
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
                    onClick={() => {
                        router.push("/");
                    }}
                />
            </div>
            <SearchBar />
            <WalletConnectButton />
        </div>
    );
};

NavBar.displayName = "NavBar";
