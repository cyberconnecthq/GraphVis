// src\components\Graph\FocusGraphWrapper.tsx

import dynamic from "next/dynamic";

const FocusGraph = dynamic(() => import("./FocusGraph"), {
    ssr: false,
});

export default FocusGraph;
