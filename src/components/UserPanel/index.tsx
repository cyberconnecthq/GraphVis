// src\components\UserPanel\index.tsx

import { useGraph } from "@/context/GraphContext";
import { useWeb3 } from "@/context/web3Context";
import { LoadingButton } from "@mui/lab";
import { Button, Typography } from "@mui/material";
import {
  Blockchain,
  Env,
  FollowButton,
} from "@cyberconnect/react-follow-button";
import styles from "./index.module.css";

export const UserPanel: React.FC = () => {
  const { selectAddress, identity, setGraphAddress } = useGraph();
  const { address } = useWeb3();

  if (!identity) return null;
  return (
    <>
      <div className={styles.container}>
        {/* userInfoSection */}
        <div className={styles.userInfoSection}>
          {/* User Avatar from ENS */}
          <div className={styles.avatarSection}>
            {identity.avatar ? (
              <a
                rel="noreferrer"
                href={
                  "https://app.cyberconnect.me/address/" + identity?.address
                }
                target={"_blank"}
              >
                <img
                  src={identity.avatar}
                  alt={""}
                  width={60}
                  height={60}
                  className={styles.avatar}
                />
              </a>
            ) : (
              <a
                rel="noreferrer"
                href={
                  "https://app.cyberconnect.me/address/" + identity?.address
                }
                target={"_blank"}
              >
                <img
                  src={"/Sample_User_Icon.png"}
                  alt={""}
                  width={60}
                  height={60}
                  className={styles.avatar}
                />
              </a>
            )}
            {address && (
              <FollowButton
                provider={window.ethereum}
                namespace="CyberConnect"
                toAddr={selectAddress}
                env={Env.PRODUCTION}
                chain={Blockchain.ETH}
                key={selectAddress}
              />
            )}
          </div>

          {/* User Name from ENS or therir address*/}
          <div className={styles.userName}>
            {identity.ens ? (
              <Typography
                variant="h3"
                sx={{
                  margin: "10px 20px",
                  fontFamily: "Outfit",
                }}
              >
                {identity.ens}
              </Typography>
            ) : (
              <Typography variant="h3"></Typography>
            )}
            <Typography
              variant="h6"
              paddingLeft={2}
              sx={{ color: "gray", fontFamily: "Outfit" }}
            >
              {identity?.address}
            </Typography>
          </div>
        </div>

        {/* Followings & Followers Section */}
        <div className={styles.followSection}>
          <div className={styles.follow}>
            <Typography variant="h3">{identity.followerCount}</Typography>
            <Typography color={"#989898"}>Followers</Typography>
          </div>
          <div className={styles.follow}>
            <Typography variant="h3">{identity.followingCount}</Typography>
            <Typography color={"#989898"}>Followings</Typography>
          </div>
        </div>

        {/* Social Section */}
        <div className={styles.socialSection}>
          <Typography color={"#989898"} marginLeft={2}>
            External Links
          </Typography>
          <div className={styles.social}>
            {identity.social.twitter && (
              <div className={styles.twitter}>
                <img src={"/icons/twitter.png"} alt={""} />
                <a
                  href={"https://twitter.com/" + identity.social.twitter}
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <Button className={styles.twitterButton}>
                    {" "}
                    {"@" + identity.social.twitter}
                  </Button>
                </a>
              </div>
            )}

            <a
              href={"https://opensea.io/" + identity.address}
              target={"_blank"}
              rel="noreferrer"
            >
              <img
                src={"/icons/opensea.png"}
                alt={""}
                className={styles.socialIcon}
              />
            </a>

            <a
              href={"https://rarible.com/user/" + identity.address}
              target={"_blank"}
              rel="noreferrer"
            >
              <img
                src={"/icons/rarible.png"}
                alt={""}
                className={styles.socialIcon}
              />
            </a>
            <a
              href={"https://foundation.app/" + identity.address}
              target={"_blank"}
              rel="noreferrer"
            >
              <img
                src={"/icons/foundation.png"}
                alt={""}
                className={styles.socialIcon}
              />
            </a>
            <a
              href={"https://context.app/" + identity.address}
              target={"_blank"}
              rel="noreferrer"
            >
              <img
                src={"/icons/context.png"}
                alt={""}
                className={styles.socialIcon}
              />
            </a>
            <a
              href={"https://etherscan.io/address/" + identity.address}
              target={"_blank"}
              rel="noreferrer"
            >
              <img
                src={"/icons/etherscan.ico"}
                alt={""}
                className={styles.socialIcon}
              />
            </a>
          </div>
        </div>
        {/* Follower & Followings Tab Section */}
        <LoadingButton
          // loading={loading}
          className={styles.exploreButton}
          onClick={() => setGraphAddress(selectAddress)}
          sx={{
            ":hover": {
              bgcolor: "#555",
            },
            fontFamily: "Outfit",
          }}
        >
          EXPLORE THIS ADDRESS!
        </LoadingButton>
        {/* <TabsPanel /> */}
      </div>
    </>
  );
};

UserPanel.displayName = "UserPanel";
