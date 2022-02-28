import { NavBar } from "@/components/NavBar";
import { UserPanel } from "@/components/UserPanel";
import { DEFAULT_ADDRESS } from "@/config/config";
import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useState } from "react";
import FocusGraph from "../components/Graph/FocusGraphWrapper";

const SocialGraph: NextPage = () => {
    return (
        //TODO: make our graph happen
        <div>
            <NavBar />
            <UserPanel />
            <FocusGraph />
        </div>
    );
};

export default SocialGraph;
