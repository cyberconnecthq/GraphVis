// src\context\GraphContext.tsx

import { GET_ADDR_CONNECTION_QUERY } from "@/graphql/queries/get_connections";
import { GET_IDENTITY } from "@/graphql/queries/get_identity";
import { GET_RECOMMENDATION } from "@/graphql/queries/get_recommendation";
import {
    AllRecommendations,
    AllSocialConnections,
    SocialConnection,
} from "@/types/AllSocialConnections";
import { useQuery } from "@apollo/client";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { Identity } from "../types/identity";
import { useWeb3 } from "./web3Context";

export type GraphNode = {
    id: string;
    img: string;
    group: number;
    neighbors: string[];
    links: GraphLink[];
};

export type GraphLink = {
    source: string;
    target: string;
    value: number;
};

export type GraphData = {
    nodes: GraphNode[];
    links: GraphLink[];
};

export enum AppMode {
    CyberMode = 1,
    FocusMode,
}

export const DEFAULT_QUOTA = 10;

interface GraphContextInterface {
    graphAddress: string; //the address which generate the 3d graph based on it
    selectAddress: string; //the address which to be shown in the User Panel
    graphData: GraphData | undefined; //the data which to create the graph based on graphAddress
    graphLoading: boolean; //graph loading status
    identity: Identity | null; //user indentity info including the ens, avatar, twitter etc.
    appMode: AppMode; //for changing the app mode between cyber mode or focus mode
    count: number; //

    setGraphAddress: (address: string) => void;
    setSelectAddress: (address: string) => void;
    setGraphData: (data: GraphData | undefined) => void;
    setGraphLoading: (loading: boolean) => void;
    setAppMode: (mode: AppMode) => void;
}

export const GraphContext = createContext<GraphContextInterface>({
    graphAddress: "",
    selectAddress: "",
    graphData: undefined,
    graphLoading: true,
    identity: null,
    appMode: AppMode.CyberMode,
    count: 0,

    setGraphAddress: async () => undefined,
    setSelectAddress: async () => undefined,
    setGraphData: async () => undefined,
    setGraphLoading: async () => undefined,
    setAppMode: async () => undefined,
});
let count = 0;

export const GraphContextProvider: React.FC = ({ children }) => {
    const { address } = useWeb3();

    // Cyberlab.eth default address
    const [graphAddress, setGraphAddress] = useState<string>(
        "0x148d59faf10b52063071eddf4aaf63a395f2d41c"
    );
    const [selectAddress, setSelectAddress] = useState<string>(
        "0x148d59faf10b52063071eddf4aaf63a395f2d41c"
    );
    const [graphData, setGraphData] = useState<GraphData | undefined>(
        undefined
    );
    const [graphLoading, setGraphLoading] = useState<boolean>(true);
    const [identity, setIdentity] = useState<Identity | null>(null);
    const [appMode, setAppMode] = useState<AppMode>(AppMode.CyberMode);

    //Fetch IdentityData: followers following num
    const identityData = useQuery(GET_IDENTITY, {
        variables: {
            address: selectAddress,
        },
    }).data;

    useEffect(() => {
        if (identityData) {
            setIdentity(identityData.identity);
        }
    }, [identityData]);

    const { fetchMore } = useQuery(GET_ADDR_CONNECTION_QUERY, {
        variables: {
            address: graphAddress,
            first: 50,
            after: "-1",
        },
    });

    const { fetchMore: fetchMoreRecommendation } = useQuery(
        GET_RECOMMENDATION,
        {
            variables: {
                address: graphAddress,
            },
        }
    );

    // Fetch Recommendations
    const fetchRecommendations = useCallback(
        async (targetAddr: string) => {
            const { data: recommendationData } = await fetchMoreRecommendation({
                variables: { address: targetAddr },
                updateQuery: (prev: any, { fetchMoreResult }) => {
                    return fetchMoreResult;
                },
            });
            const recommendationList = (
                recommendationData as AllRecommendations
            ).recommendations.data?.list;
            if (!recommendationList) {
                return { nodes: [], links: [] };
            }
            // Return recommendation list as GraphNode[]
            const retGraphData: GraphData = { nodes: [], links: [] };
            retGraphData.nodes = [
                ...[...recommendationList].map((item: SocialConnection) => {
                    return {
                        id: item.address,
                        img: item.avatar,
                        group: 4,
                        neighbors: [],
                        links: [],
                    };
                }),
            ];

            function getRandomInt(max: number) {
                return Math.floor(Math.random() * max);
            }

            for (let i = 0; i < retGraphData.nodes.length / 2; i++) {
                retGraphData.links.push({
                    source: retGraphData.nodes[
                        getRandomInt(retGraphData.nodes.length)
                    ].id,
                    target: retGraphData.nodes[
                        getRandomInt(retGraphData.nodes.length)
                    ].id,
                    value: 0,
                });
            }

            return retGraphData;
        },
        [fetchMoreRecommendation]
    );

    // Fetch friends, followings, followers
    const fetch3Fs = useCallback(
        async (targetAddr: string, isFocusMode: boolean) => {
            const hasNextPage = true,
                after = "-1";
            let followerList: SocialConnection[],
                followingList: SocialConnection[],
                friendList: SocialConnection[];
            followerList = [];
            followingList = [];
            friendList = [];

            let allData;
            // TODO: Paginated fetching
            // Currently only load one batch
            while (hasNextPage) {
                const { data } = await fetchMore({
                    variables: {
                        address: targetAddr,
                        first: 50,
                        after,
                    },
                    updateQuery: (prev: any, { fetchMoreResult }) => {
                        return fetchMoreResult;
                    },
                });

                // Process Followers
                followerList = (data as AllSocialConnections).identity.followers
                    .list;
                followingList = (data as AllSocialConnections).identity
                    .followings.list;
                friendList = (data as AllSocialConnections).identity.friends
                    .list;
                allData = data;
                break;
            }

            // Three lists filter out redundant elements
            const friendAddrList = friendList.map((item) => item.address);
            followingList = followingList.filter(
                (item) => !friendAddrList.includes(item.address)
            );
            followerList = followerList.filter(
                (item) => !friendAddrList.includes(item.address)
            );

            // Construct Returning GraphData
            let retGraphData: GraphData;
            if (isFocusMode) {
                retGraphData = {
                    nodes: [
                        {
                            id: targetAddr,
                            img: (allData as AllSocialConnections).identity
                                .avatar,
                            group: 0,
                            neighbors: [],
                            links: [],
                        },
                        {
                            id: "Followings",
                            img: "",
                            group: 1,
                            neighbors: [],
                            links: [],
                        },
                        {
                            id: "Followers",
                            img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhotpot.ai%2Fcolorize-picture&psig=AOvVaw0LGfAtY4jm1qGvtp93Wh59&ust=1646331326777000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMivj5-EqPYCFQAAAAAdAAAAABAF",
                            group: 2,
                            neighbors: [],
                            links: [],
                        },
                        {
                            id: "Friends",
                            img: "",
                            group: 3,
                            neighbors: [],
                            links: [],
                        },
                        ...[...followingList].map((item: SocialConnection) => {
                            return {
                                id: item.address,
                                img: item.avatar,
                                group: 1,
                                neighbors: [],
                                links: [],
                            };
                        }),
                        ...[...followerList].map((item: SocialConnection) => {
                            return {
                                id: item.address,
                                img: item.avatar,
                                group: 2,
                                neighbors: [],
                                links: [],
                            };
                        }),
                        ...[...friendList].map((item: SocialConnection) => {
                            return {
                                id: item.address,
                                img: item.avatar,
                                group: 3,
                                neighbors: [],
                                links: [],
                            };
                        }),
                    ],
                    links: [
                        ...[...followingList].map((item: SocialConnection) => {
                            return {
                                source: item.address,
                                target: "Followings",
                                value: 1,
                            };
                        }),
                        ...[...followerList].map((item: SocialConnection) => {
                            return {
                                source: item.address,
                                target: "Followers",
                                value: 2,
                            };
                        }),
                        ...[...friendList].map((item: SocialConnection) => {
                            return {
                                source: item.address,
                                target: "Friends",
                                value: 3,
                            };
                        }),
                        {
                            source: targetAddr,
                            target: "Friends",
                            value: 0,
                        },
                        {
                            source: targetAddr,
                            target: "Followings",
                            value: 0,
                        },
                        {
                            source: targetAddr,
                            target: "Followers",
                            value: 0,
                        },
                    ],
                };
            } else {
                retGraphData = {
                    nodes: [
                        {
                            id: targetAddr,
                            img: (allData as AllSocialConnections).identity
                                .avatar,
                            group: 0,
                            neighbors: [],
                            links: [],
                        },
                        ...[...followingList].map((item: SocialConnection) => {
                            return {
                                id: item.address,
                                img: item.avatar,
                                group: 1,
                                neighbors: [],
                                links: [],
                            };
                        }),
                        ...[...followerList].map((item: SocialConnection) => {
                            return {
                                id: item.address,
                                img: item.avatar,
                                group: 2,
                                neighbors: [],
                                links: [],
                            };
                        }),
                        ...[...friendList].map((item: SocialConnection) => {
                            return {
                                id: item.address,
                                img: item.avatar,
                                group: 3,
                                neighbors: [],
                                links: [],
                            };
                        }),
                    ],
                    links: [
                        ...[...followingList].map((item: SocialConnection) => {
                            return {
                                source: item.address,
                                target: targetAddr,
                                value: 1,
                                neighbors: [],
                                links: [],
                            };
                        }),
                        ...[...followerList].map((item: SocialConnection) => {
                            return {
                                source: item.address,
                                target: targetAddr,
                                value: 2,
                                neighbors: [],
                                links: [],
                            };
                        }),
                        ...[...friendList].map((item: SocialConnection) => {
                            return {
                                source: item.address,
                                target: targetAddr,
                                value: 3,
                                neighbors: [],
                                links: [],
                            };
                        }),
                    ],
                };
            }
            return retGraphData;
        },
        [fetchMore]
    );

    const loadGraphConnections = useCallback(async () => {
        // queue is to do BFS, set is a hashMap record appeared addresses
        const bfsQueue = [];
        const set = new Set();
        let retGraphData: GraphData = {
            nodes: [],
            links: [],
        };

        bfsQueue.push(graphAddress);
        set.add(graphAddress);
        count = 0;

        while (count < DEFAULT_QUOTA) {
            const headAddr = bfsQueue.shift();
            if (headAddr == undefined) {
                continue;
            }
            const recommendGD = await fetchRecommendations(headAddr);
            const threeFsGD = await fetch3Fs(headAddr, false);
            retGraphData = {
                nodes: [
                    ...retGraphData.nodes,
                    ...recommendGD.nodes,
                    ...threeFsGD.nodes,
                ],
                links: [
                    ...retGraphData.links,
                    ...recommendGD.links,
                    ...threeFsGD.links,
                ],
            };

            // Expand BFS search
            for (const toNode of retGraphData.nodes) {
                if (!set.has(toNode.id)) {
                    set.add(toNode.id);
                    bfsQueue.push(toNode.id);
                }
            }
            count++;
        }

        return retGraphData;
    }, [fetch3Fs, fetchRecommendations, graphAddress]);

    const preprocessGraphNeighbors = (graphData: GraphData) => {
        graphData.links.forEach((link) => {
            const aNodes = graphData.nodes.filter(
                (node) => node.id === link.source
            );
            const bNodes = graphData.nodes.filter(
                (node) => node.id === link.target
            );
            for (const bNode of bNodes) {
                for (const aNode of aNodes) {
                    aNode.neighbors.push(bNode.id);
                    bNode.neighbors.push(aNode.id);

                    aNode.links.push(link);
                    bNode.links.push(link);
                }
            }
        });

        return graphData;
    };

    // For Cyber Mode
    const loadCyberModeConnections = useCallback(async () => {
        await setGraphLoading(true);
        await setGraphData({ nodes: [], links: [] });
        const newGraphData = await loadGraphConnections();
        const processedGraphData = preprocessGraphNeighbors(newGraphData);
        await setGraphData(processedGraphData);
        await setGraphLoading(false);
    }, [loadGraphConnections]);

    // For Focus Mode
    const loadFocusModeConnections = useCallback(async () => {
        await setGraphLoading(true);
        await setGraphData({ nodes: [], links: [] });
        const recommendGD = await fetchRecommendations(graphAddress);
        const threeFsGD = await fetch3Fs(graphAddress, true);
        const newGraphData = {
            nodes: [...recommendGD.nodes, ...threeFsGD.nodes],
            links: [...recommendGD.links, ...threeFsGD.links],
        };
        const processedGraphData = preprocessGraphNeighbors(newGraphData);
        await setGraphData(processedGraphData);
        await setGraphLoading(false);
    }, [graphAddress, fetch3Fs, fetchRecommendations]);

    // Using when mode or graphAddress changed
    useEffect(() => {
        if (appMode == AppMode.CyberMode) {
            loadCyberModeConnections();
        } else {
            loadFocusModeConnections();
        }
    }, [
        graphAddress,
        appMode,
        loadCyberModeConnections,
        loadFocusModeConnections,
    ]);

    useEffect(() => {
        if (address) {
            setSelectAddress(address);
            setGraphAddress(address);
        }
    }, [address]);

    return (
        <GraphContext.Provider
            value={{
                // values
                graphData,
                selectAddress,
                graphAddress,
                graphLoading,
                identity,
                appMode,
                // setters
                setGraphData,
                setSelectAddress,
                setGraphAddress,
                setGraphLoading,
                setAppMode,
                count,
            }}
        >
            {children}
        </GraphContext.Provider>
    );
};

export const useGraph = () => {
    const graph = useContext(GraphContext);
    return graph;
};
