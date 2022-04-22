// src\pages\index.tsx

import FocusGraph from "@/components/Graph/FocusGraphWrapper";
import { NavBar } from "@/components/NavBar";
import { UserPanel } from "@/components/UserPanel";
import { DEFAULT_QUOTA, useGraph } from "@/context/GraphContext";
import { useWeb3 } from "@/context/web3Context";
import { LoadingButton } from "@mui/lab";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import styles from "../../styles/Home.module.css";
import client from "../graphql/client";

const Home: NextPage = () => {
  const [exploreMode, setExploreMode] = useState(false);
  const { address } = useWeb3();
  const { graphLoading, count } = useGraph();

  useEffect(() => {
    if (address) {
      setExploreMode(true);
    }
  }, [address]);

  useEffect(() => {
    client;
  }, []);

  // const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>CyberGraph</title>
        <meta
          name="description"
          content="CyberGraph is a 3D-graph based, user based social connection explorer. It has some cool features like 3d node graph, dynamic loading bar, immersive user experience, cyber mode(10-hops friendship network display) and focus mode(aggregated connection display)."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className={styles.loadingSection}>
        {count != 10 && (
          <ReactLoading
            type="bars"
            color="#FFFFFF"
            className={styles.loadingIcon}
          />
        )}
        <div
          className={styles.loadingText}
          style={{
            color: "white",
            fontSize: "28px",
          }}
        >
          {" "}
          Loading {(100 * count) / DEFAULT_QUOTA} %
        </div>
      </div>
      {!exploreMode ? (
        <main className={styles.main}>
          <h1 className={styles.title}>CYBERCONNECTED IN </h1>
          <h1 className={styles.title}>THE METAVERSE</h1>
          <LoadingButton
            // loading={loading}
            className={styles.jumpButton}
            onClick={() => setExploreMode(true)}
          >
            Let&apos;s jump in!
          </LoadingButton>
        </main>
      ) : (
        <UserPanel />
      )}
      {!graphLoading && (
        <>
          <FocusGraph />
        </>
      )}
    </div>
  );
};

export default Home;
