// import { createContext, useState, useContext } from "react";
// import { useQuery } from "@apollo/client";
// import { GET_IDENTITY } from "@/graphql/queries/get_identity";
// import { Identity } from "../utils/types";
// import { GET_ADDR_CONNECTION_QUERY } from "@/graphql/queries/get_connections";

// type GraphData = {
//     nodes: {
//         id: string;
//         img: string;
//         group: number;
//     }[];
//     links: {
//         source: string;
//         target: string;
//         value: number;
//     }[];
// };

// interface GraphContextInterface {
//     data: GraphData | {};
//     graphAddress: string;
//     selectAddress: string;
//     graphData: GraphData | {};

//     setGraphAddress: (address: string) => void;
//     setSelectAddress: (address: string) => void;
//     setGraphData: (data: GraphData | {}) => void;
// }

// export const GraphContext = createContext<GraphContextInterface>({
//     data: {},
//     graphAddress: "",
//     selectAddress: "",
//     graphData: {},
//     setGraphAddress: async () => undefined,
//     setSelectAddress: async () => undefined,
//     setGraphData: async () => undefined,
// });

// export const GraphContextProvider: React.FC = ({ children }) => {
//     const [graphAddress, setGraphAddress] = useState<string>("");
//     const [selectAddress, setSelectAddress] = useState<string>("");

//     const [graphData, setGraphData] = useState<GraphData | {}>({});

//     const identityData = useQuery(GET_IDENTITY, {
//         variables: {
//             address: graphAddress,
//         },
//     }).data;

//     const loadNodeConnections = async (addr: string) => {
//         const { fetchMore } = useQuery(GET_ADDR_CONNECTION_QUERY, {
//             variables: {
//                 address: "",
//                 network: "ETH",
//                 after: "0",
//                 first: 50,
//                 namespace: "",
//             }
//         });

//         let hasNextPage = true
//         let offset = '0'

//         while(hasNextPage) {
//             const { data } = await fetchMore({
//                 variables: {
//                     address: addr,
//                     network: "ETH",
//                     after: offset,
//                     first: 50,
//                     namespace: "",
//                 },
//                 updateQuery: (prev: any, { fetchMoreResult }) => {
//                     if(prev.identity === undefined || prev.identity.followers === undefined) {
//                         return fetchMoreResult;
//                     }
//                     fetchMoreResult.identity.followers.list = prev.identity.followers.list.concat(fetchMoreResult.identity.followers.list);
//                     fetchMoreResult.identity.followings.list = prev.identity.followings.list.concat(fetchMoreResult.identity.followings.list);
//                     fetchMoreResult.identity.friends.list = prev.identity.friends.list.concat(fetchMoreResult.identity.friends.list);
//                     return fetchMoreResult;
//                 }
//             })

//             const identity = data.identity

//             hasNextPage = identity.followers.pageInfo.hasNextPage || identity.followings.pageInfo.hasNextPage || identity.friends.pageInfo.hasNextPage
//             offset = Math.max(+identity.followers.pageInfo.endCursor, +identity.followings.pageInfo.endCursor, +identity.friends.pageInfo.endCursor).toString()

//             if (Math.max(identity.followers.list.length, identity.followings.list.length, identity.friends.list.length) >= 500) {
//                 hasNextPage = false
//             }
//             if (!hasNextPage) {
//                 return data
//             }
//         }
//     }

//     const loadGraphConnections = async () => {
//         let stack = [], num = 0;
//         let set = new Set();
//         let retGraph = {
//             nodes: [],
//             links: [],
//         }
//         const MAX_NUM = 30, MAX_DEPTH = 1;

//         stack.push({
//             "num": num,
//             "depth": 0,
//             "addr": graphAddress
//         });
//         set.add(graphAddress);

//         while(stack.length) {
//             let headNode = stack.shift();
//             let headDepth = headNode?.depth;
//             let headAddr = headNode?.addr;
//             let headNum = headNode?.num;

//             const toAddrList = await loadNodeConnections(headAddr);
//             for (const toAddr of toAddrList) {
//                 // Add Node
//                 retGraph.nodes.push({
//                     "id": headNum?.toString(),

//                 })
//                 // Add Edge

//                 // Add to stack
//                 if (num < MAX_NUM) {
//                     num++;
//                 }
//             }
//         }
//     };

//     return (
//         <GraphContext.Provider
//             value={{
//                 graphData,
//                 selectAddress,
//                 graphAddress,
//                 setGraphAddress,
//             }}
//         >
//             {children}
//         </GraphContext.Provider>
//     );
// };

// export const useGraph = () => {
//     const graph = useContext(GraphContext);
//     return graph;
// };
