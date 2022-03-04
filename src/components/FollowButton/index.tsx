import { LoadingButton } from "@mui/lab";
import styles from "./index.module.css";

export const FollowButton: React.FC = () => {
    return (
        <>
            <LoadingButton
                // loading={loading}
                className={styles.followButton}
                sx={{
                    ":hover": {
                        bgcolor: "#555",
                    },
                }}
            >
                FOLLOW NOW
            </LoadingButton>
        </>
    );
};

FollowButton.displayName = "FollowButton";
