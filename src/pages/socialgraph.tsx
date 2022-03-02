import { NavBar } from "@/components/NavBar";
import { UserPanel } from "@/components/UserPanel";
import { DEFAULT_ADDRESS } from "@/config/config";
import { useGraph } from "@/context/GraphContext";
import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useState } from "react";
import ReactLoading from "react-loading";
import FocusGraph from "../components/Graph/FocusGraphWrapper";

const SocialGraph: NextPage = () => {
    const { graphLoading } = useGraph();

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
                        Thank you for using CyberConnect!!
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
