import {
    createContext,
    useState,
    useContext,
    useCallback,
    useEffect,
    useMemo,
} from "react";
import { useQuery } from "@apollo/client";
import { GET_IDENTITY } from "@/graphql/queries/get_identity";
import { Identity } from "../types/identity";
import { GET_ADDR_CONNECTION_QUERY } from "@/graphql/queries/get_connections";
import {
    AllRecommendations,
    AllSocialConnections,
    SocialConnection,
} from "@/types/AllSocialConnections";
import { GET_RECOMMENDATION } from "@/graphql/queries/get_recommendation";
import { ConstructionOutlined } from "@mui/icons-material";

export type GraphNode = {
    id: string;
    img: string;
    group: number;
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
    graphAddress: string;
    selectAddress: string;
    graphData: GraphData | undefined;
    graphLoading: boolean;
    connections: any;
    identity: Identity | null;
    appMode: AppMode;
    count: number;

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
    connections: null,
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
    // Cyberlab.eth default address
    const [graphAddress, setGraphAddress] = useState<string>(
        "0x148d59faf10b52063071eddf4aaf63a395f2d41c"
    );
    const [selectAddress, setSelectAddress] = useState<string>("");
    const [graphData, setGraphData] = useState<GraphData | undefined>(
        undefined
    );
    const [graphLoading, setGraphLoading] = useState<boolean>(true);
    const [identity, setIdentity] = useState<Identity | null>(null);
    const [connections, setConnections] = useState<AllSocialConnections | null>(
        null
    );
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
            namespace: "",
        },
    });

    let { fetchMore: fetchMoreRecommendation } = useQuery(GET_RECOMMENDATION, {
        variables: {
            address: graphAddress,
        },
    });

    // Fetch Recommendations
    const fetchRecommendations = async (targetAddr: string) => {
        const { data: recommendationData } = await fetchMoreRecommendation({
            variables: { address: targetAddr },
            updateQuery: (prev: any, { fetchMoreResult }) => {
                return fetchMoreResult;
            },
        });
        let recommendationList = (recommendationData as AllRecommendations)
            .recommendations.data?.list;
        if (!recommendationList) {
            return { nodes: [], links: [] };
        }
        // console.log(re)
        // Return recommendation list as GraphNode[]
        let retGraphData: GraphData = { nodes: [], links: [] };
        retGraphData.nodes = [
            ...[...recommendationList].map((item: SocialConnection) => {
                return {
                    id: item.address,
                    img: item.avatar,
                    group: 4,
                };
            }),
        ];

        return retGraphData;
    };

    //Fetch ConnectionsData
    // const fetchConnectionsData = async (targetAddr: string) => {
    //     let hasNextPage = true,
    //         after = "-1";

    //     let allData;
    //     // TODO: Paginated fetching
    //     // Currently only load one batch
    //     // while (hasNextPage) {
    //     const { data } = await fetchMore({
    //         variables: {
    //             address: targetAddr,
    //             first: 50,
    //             after,
    //             namespace: "",
    //         },
    //         updateQuery: (prev: any, { fetchMoreResult }) => {
    //             return fetchMoreResult;
    //         },
    //     });

    //     allData = data;
    //     console.log("allData", allData);

    //     //     break;
    //     // }
    //     // setConnections(allData);
    //     return allData;
    // };

    // Fetch friends, followings, followers
    const fetch3Fs = async (targetAddr: string, isFocusMode: boolean) => {
        let hasNextPage = true,
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
                    namespace: "",
                },
                updateQuery: (prev: any, { fetchMoreResult }) => {
                    return fetchMoreResult;
                },
            });

            // Process Followers
            followerList = (data as AllSocialConnections).identity.followers
                .list;
            followingList = (data as AllSocialConnections).identity.followings
                .list;
            friendList = (data as AllSocialConnections).identity.friends.list;
            allData = data;
            break;
        }

        // Three lists filter out redundant elements
        let friendAddrList = friendList.map((item) => item.address);
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
                        img: (allData as AllSocialConnections).identity.avatar,
                        group: 0,
                    },
                    {
                        id: "Followings",
                        img: "",
                        group: 1,
                    },
                    {
                        id: "Followers",
                        img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fhotpot.ai%2Fcolorize-picture&psig=AOvVaw0LGfAtY4jm1qGvtp93Wh59&ust=1646331326777000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMivj5-EqPYCFQAAAAAdAAAAABAF",
                        group: 2,
                    },
                    {
                        id: "Friends",
                        img: "",
                        group: 3,
                    },
                    ...[...followingList].map((item: SocialConnection) => {
                        return {
                            id: item.address,
                            img: item.avatar,
                            group: 1,
                        };
                    }),
                    ...[...followerList].map((item: SocialConnection) => {
                        return {
                            id: item.address,
                            img: item.avatar,
                            group: 2,
                        };
                    }),
                    ...[...friendList].map((item: SocialConnection) => {
                        return {
                            id: item.address,
                            img: item.avatar,
                            group: 3,
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
                        img: (allData as AllSocialConnections).identity.avatar,
                        group: 0,
                    },
                    ...[...followingList].map((item: SocialConnection) => {
                        return {
                            id: item.address,
                            img: item.avatar,
                            group: 1,
                        };
                    }),
                    ...[...followerList].map((item: SocialConnection) => {
                        return {
                            id: item.address,
                            img: item.avatar,
                            group: 2,
                        };
                    }),
                    ...[...friendList].map((item: SocialConnection) => {
                        return {
                            id: item.address,
                            img: item.avatar,
                            group: 3,
                        };
                    }),
                ],
                links: [
                    ...[...followingList].map((item: SocialConnection) => {
                        return {
                            source: item.address,
                            target: targetAddr,
                            value: 1,
                        };
                    }),
                    ...[...followerList].map((item: SocialConnection) => {
                        return {
                            source: item.address,
                            target: targetAddr,
                            value: 2,
                        };
                    }),
                    ...[...friendList].map((item: SocialConnection) => {
                        return {
                            source: item.address,
                            target: targetAddr,
                            value: 3,
                        };
                    }),
                ],
            };
        }
        return retGraphData;
    };

    const loadGraphConnections = async (addr: string) => {
        // queue is to do BFS, set is a hashMap record appeared addresses
        let bfsQueue = [];
        let set = new Set();
        let retGraphData: GraphData = {
            nodes: [],
            links: [],
        };

        bfsQueue.push(graphAddress);
        set.add(graphAddress);
        count = 0;

        while (count < DEFAULT_QUOTA) {
            console.log(count);
            let headAddr = bfsQueue.shift();
            if (headAddr == undefined) {
                continue;
            }
            let recommendGD = await fetchRecommendations(headAddr);
            let threeFsGD = await fetch3Fs(headAddr, false);
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
    };

    // For Cyber Mode
    const loadCyberModeConnections = useCallback(async () => {
        await setGraphLoading(true);
        await setGraphData({ nodes: [], links: [] });
        let newGraphData = await loadGraphConnections(graphAddress);
        await setGraphData(newGraphData);
        await setGraphLoading(false);
        console.log("newGraphData:", newGraphData);
    }, [graphAddress]);

    // For Focus Mode
    const loadFocusModeConnections = useCallback(async () => {
        await setGraphLoading(true);
        await setGraphData({ nodes: [], links: [] });
        let recommendGD = await fetchRecommendations(graphAddress);
        let threeFsGD = await fetch3Fs(graphAddress, true);
        console.log("recommendGD:", recommendGD);
        console.log("threeFsGD", threeFsGD);

        await setGraphData({
            nodes: [...recommendGD.nodes, ...threeFsGD.nodes],
            links: [...recommendGD.links, ...threeFsGD.links],
        });
        await setGraphLoading(false);
        console.log("graphData:", graphData);
    }, [graphAddress]);

    // Using when mode or graphAddress changed
    useEffect(() => {
        if (appMode == AppMode.CyberMode) {
            loadCyberModeConnections();
        } else {
            loadFocusModeConnections();
        }
    }, [graphAddress, appMode]);

    //Using when selectedAddress chnaged
    // const loadConnections = useCallback(async () => {
    //     const ConnectionsData = await fetchConnectionsData(selectAddress);
    //     console.log("ConnectionsData", ConnectionsData);
    //     console.log("selected", selectAddress);
    //     setConnections(ConnectionsData);
    // }, [selectAddress]);

    // useEffect(() => {
    //     loadConnections();
    // }, [selectAddress]);

    return (
        <GraphContext.Provider
            value={{
                // values
                graphData,
                selectAddress,
                graphAddress,
                graphLoading,
                identity,
                connections,
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
