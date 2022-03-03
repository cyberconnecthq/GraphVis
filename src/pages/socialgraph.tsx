import { NavBar } from "@/components/NavBar";
import { UserPanel } from "@/components/UserPanel";
import { DEFAULT_ADDRESS } from "@/config/config";
import { DEFAULT_QUOTA, useGraph } from "@/context/GraphContext";
import { useWeb3 } from "@/context/Web3Context";
import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useState } from "react";
import ReactLoading from "react-loading";
import FocusGraph from "../components/Graph/FocusGraphWrapper";

const SocialGraph: NextPage = () => {
    const { graphLoading, count } = useGraph();

    return (
        <div
            style={{
                display: "flex",
            }}
        >
            <NavBar />
            {graphLoading && (
                <div
                    style={{
                        margin: "500px",
                        justifyContent: "center",
                    }}
                >
                    {/* <ReactLoading type="bars" color="#357EDD" /> */}
                    <ReactLoading type="bars" color="#FFFFFF" />
                    <p
                        style={{
                            color: "white",
                            fontSize: "28px",
                        }}
                    >
                        Thank you for using CyberConnect :)
                    </p>
                    <br />
                    <p
                        style={{
                            color: "white",
                            fontSize: "28px",
                        }}
                    >
                        CyberGraph is fetching latest data ...
                    </p>
                    <br />
                    <p
                        style={{
                            color: "white",
                            fontSize: "28px",
                        }}
                    >
                        Loading {(100 * count) / DEFAULT_QUOTA} %
                    </p>
                </div>
            )}
            {!graphLoading && (
                <>
                    <UserPanel />
                    <FocusGraph />
                </>
            )}
        </div>
    );
};

export default SocialGraph;
