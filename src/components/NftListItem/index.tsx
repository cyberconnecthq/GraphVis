import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { ButtonBase, Tooltip, Typography } from "@mui/material";
import styles from "./index.module.css";

type Props = {
    name: string;
    imageUrl: string | null;
    onClick: () => void;
};

export const NftListItem = ({ name, imageUrl, onClick }: Props) => {
    return (
        <Tooltip
            placement="top"
            arrow
            title={
                <>
                    <Typography className={styles.tooltipTitle}>
                        {name}
                    </Typography>
                    <Typography className={styles.tooltipSubtitle}>
                        Click for more details
                    </Typography>
                </>
            }
        >
            <ButtonBase className={styles.button} onClick={onClick}>
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
            </ButtonBase>
        </Tooltip>
    );
};
