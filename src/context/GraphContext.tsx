import {
    createContext,
    useState,
    useContext,
    useCallback,
    useEffect,
} from "react";
import { useQuery } from "@apollo/client";
import { GET_IDENTITY } from "@/graphql/queries/get_identity";
import { Identity } from "../utils/types";
import { GET_ADDR_CONNECTION_QUERY } from "@/graphql/queries/get_connections";
import {
    AllRecommendations,
    AllSocialConnections,
    SocialConnection,
} from "@/types/AllSocialConnections";
import { GET_RECOMMENDATION } from "@/graphql/queries/get_recommendation";
import data from "@/components/Graph/data";

type GraphData = {
    nodes: {
        id: string;
        img: string;
        group: number;
    }[];
    links: {
        source: string;
        target: string;
        value: number;
    }[];
};

interface GraphContextInterface {
    graphAddress: string;
    selectAddress: string;
    graphData: GraphData | undefined;
    graphLoading: boolean;
    connections: AllSocialConnections | null;

    setGraphAddress: (address: string) => void;
    setSelectAddress: (address: string) => void;
    setGraphData: (data: GraphData | undefined) => void;
    setGraphLoading: (loading: boolean) => void;
}

export const GraphContext = createContext<GraphContextInterface>({
    graphAddress: "",
    selectAddress: "",
    graphData: undefined,
    graphLoading: true,
    connections: null,

    setGraphAddress: async () => undefined,
    setSelectAddress: async () => undefined,
    setGraphData: async () => undefined,
    setGraphLoading: async () => undefined,
});

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

    const [connections, setConnections] = useState<AllSocialConnections | null>(
        null
    );

    const { fetchMore } = useQuery(GET_ADDR_CONNECTION_QUERY, {
        variables: {
            address: graphAddress,
            first: 50,
            after: "-1",
            namespace: "",
        },
    });

    // let { fetchMore as fetchMoreRecommendation } = useQuery(GET_RECOMMENDATION, {
    //     variables: {
    //         address: graphAddress,
    //     },
    // });

    // Not used for now
    const loadNodeConnections = async (addr: string) => {
        const { fetchMore } = useQuery(GET_ADDR_CONNECTION_QUERY, {
            variables: {
                address: "",
                network: "ETH",
                after: "0",
                first: 50,
                namespace: "",
            },
        });

        let hasNextPage = true;
        let offset = "0";

        while (hasNextPage) {
            const { data } = await fetchMore({
                variables: {
                    address: addr,
                    network: "ETH",
                    after: offset,
                    first: 50,
                    namespace: "",
                },
                updateQuery: (prev: any, { fetchMoreResult }) => {
                    if (
                        prev.identity === undefined ||
                        prev.identity.followers === undefined
                    ) {
                        return fetchMoreResult;
                    }
                    fetchMoreResult.identity.followers.list =
                        prev.identity.followers.list.concat(
                            fetchMoreResult.identity.followers.list
                        );
                    fetchMoreResult.identity.followings.list =
                        prev.identity.followings.list.concat(
                            fetchMoreResult.identity.followings.list
                        );
                    fetchMoreResult.identity.friends.list =
                        prev.identity.friends.list.concat(
                            fetchMoreResult.identity.friends.list
                        );
                    return fetchMoreResult;
                },
            });

            const identity = data.identity;
            setConnections(data);

            hasNextPage =
                identity.followers.pageInfo.hasNextPage ||
                identity.followings.pageInfo.hasNextPage ||
                identity.friends.pageInfo.hasNextPage;
            offset = Math.max(
                +identity.followers.pageInfo.endCursor,
                +identity.followings.pageInfo.endCursor,
                +identity.friends.pageInfo.endCursor
            ).toString();

            if (
                Math.max(
                    identity.followers.list.length,
                    identity.followings.list.length,
                    identity.friends.list.length
                ) >= 500
            ) {
                hasNextPage = false;
            }
            if (!hasNextPage) {
                return data;
            }
        }
    };

    // Not used for now
    const loadGraphConnections = async () => {
        let stack = [],
            num = 0;
        let set = new Set();
        let retGraph = {
            nodes: [],
            links: [],
        };
        const MAX_NUM = 30,
            MAX_DEPTH = 1;

        stack.push({
            num: num,
            depth: 0,
            addr: graphAddress,
        });
        set.add(graphAddress);

        while (stack.length) {
            let headNode = stack.shift();
            let headDepth = headNode?.depth;
            let headAddr = headNode?.addr;
            let headNum = headNode?.num;

            const toAddrList = await loadNodeConnections(headAddr);
            for (const toAddr of toAddrList) {
                // Add Node
                retGraph.nodes.push({
                    id: headNum?.toString(),
                });
                // Add Edge

                // Add to stack
                if (num < MAX_NUM) {
                    num++;
                }
            }
        }
    };

    const loadGroupedConnections = async () => {
        let hasNextPage = true;
        let after = "-1";
        let num = 0;

        // Load Recommendation
        // TODO:
        // const { data as recommendationData } = await fetchMoreRecommendation({
        //     variables: { address: graphAddress},
        //     updateQuery: (prev: any, { fetchMoreResult }) => {
        //         return fetchMoreResult;
        //     }
        // });

        // Load Friendships
        while (hasNextPage) {
            num++;
            const { data } = await fetchMore({
                variables: {
                    address: graphAddress,
                    first: 50,
                    after,
                    namespace: "",
                },
                updateQuery: (prev: any, { fetchMoreResult }) => {
                    return fetchMoreResult;
                },
            });

            // TODO: Fetch paginated data source
            console.log("Lynch Dev");
            console.log(num);
            console.log(data);

            // Process Followers
            setGraphData((preState: GraphData | undefined) => {
                let followerList = (data as AllSocialConnections).identity
                    .followers.list;
                let followingList = (data as AllSocialConnections).identity
                    .followings.list;
                let friendList = (data as AllSocialConnections).identity.friends
                    .list;
                // TODO:
                // let recommendationList = (recommendationData as AllRecommendations).recommendations.data.list;

                let friendAddrList = friendList.map((item) => item.address);
                followingList = followingList.filter(
                    (item) => !friendAddrList.includes(item.address)
                );
                followerList = followerList.filter(
                    (item) => !friendAddrList.includes(item.address)
                );

                let newState: GraphData = {
                    nodes: [
                        {
                            id: graphAddress,
                            img: (data as AllSocialConnections).identity.avatar,
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
                        // TODO:
                        // ...[...recommendationData].map((item: SocialConnection) => {
                        //     return ({
                        //         id: item.address,
                        //         img: item.avatar,
                        //         group: 4,
                        //     });
                        // }),
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
                            source: graphAddress,
                            target: "Friends",
                            value: 0,
                        },
                        {
                            source: graphAddress,
                            target: "Followings",
                            value: 0,
                        },
                        {
                            source: graphAddress,
                            target: "Followers",
                            value: 0,
                        },
                    ],
                };
                return newState;
            });

            break;
        }

        setGraphLoading(false);
    };

    useEffect(() => {}, [selectAddress]);

    useEffect(() => {
        loadGroupedConnections();
    }, [graphAddress]);

    return (
        <GraphContext.Provider
            value={{
                graphData,
                selectAddress,
                graphAddress,
                graphLoading,
                setGraphData,
                setSelectAddress,
                setGraphAddress,
                setGraphLoading,
                connections,
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
