import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { Link, Modal, Typography } from "@mui/material";
import styles from "./index.module.css";

type Props = {
    name: string;
    description: string;
    imageUrl: string | null;
    openseaUrl: string;
    onClose: () => void;
};

export const NftModal = ({
    name,
    description,
    imageUrl,
    openseaUrl,
    onClose,
}: Props) => {
    return (
        <Modal
            open
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={styles.container}>
                {imageUrl ? (
                    <img src={imageUrl} className={styles.image} alt={name} />
                ) : (
                    <ImageNotSupportedIcon
                        style={{
                            color: "FFFFFF",
                            fontSize: "40px",
                            width: "64px",
                        }}
                    />
                )}
                <Typography variant="h5" className={styles.text}>
                    {name}
                </Typography>
                {description && (
                    <Typography className={styles.text}>
                        {description}
                    </Typography>
                )}
                <Link
                    href={openseaUrl}
                    rel="noopener"
                    target="_blank"
                    className={styles.link}
                >
                    View on OpenSea
                </Link>
            </div>
        </Modal>
    );
};
