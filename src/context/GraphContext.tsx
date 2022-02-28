import { createContext, useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_IDENTITY } from "@/graphql/queries/get_identity";

type GraphData = {
    nodes: {
        id: string;
        group: number;
    }[];
    links: {
        source: string;
        target: string;
        value: number;
    };
};

interface GraphContextInterface {
    data: GraphData | {};
    centerAddr: string;
    graphAddress: string;
    setGraphAddress: (address: string) => void;
}

export const GraphContext = createContext<GraphContextInterface>({
    data: {},
    centerAddr: "",
    graphAddress: "",
    setGraphAddress: async () => undefined,
});

export const GraphContextProvider: React.FC = ({ children }) => {
    const [graphAddress, setGraphAddressInternal] = useState<string>("");
    const [graphData, setGraphData] = useState<GraphData | {}>({});
    const [centerAddr, setCenterAddr] = useState<string>("");

    const identityData = useQuery(GET_IDENTITY, {
        variables: {
            address: graphAddress,
        },
    }).data;

    const setGraphAddress = (address: string) => {
        window.location.href = `/?address=${address}`;
    };

    return (
        <GraphContext.Provider
            value={{
                data: graphData,
                centerAddr: "",
                graphAddress,
                setGraphAddress,
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
