import { createContext, useState } from "react";

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
}

export const GraphContext = createContext<GraphContextInterface>({
    data: {},
    centerAddr: "",
});

export const GraphContextProvider: React.FC = ({ children }) => {
    const [graphData, setGraphData] = useState<GraphData | {}>({});
    const [centerAddr, setCenterAddr] = useState<string>("");

    return (
        <GraphContext.Provider
            value={{
                data: graphData,
                centerAddr: "",
            }}
        >
            {children}
        </GraphContext.Provider>
    );
};
