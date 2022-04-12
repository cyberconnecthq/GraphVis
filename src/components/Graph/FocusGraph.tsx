// src\components\Graph\FocusGraph.tsx

// import dynamic from "next/dynamic";
import { useGraph } from "@/context/GraphContext";
import { LoadingButton } from "@mui/lab";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import * as THREE from "three";
import { Vector2 } from "three";
import SpriteText from "three-spritetext";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import styles from "./FocusGraph.module.css";

const FocusGraph = () => {
    const fgRef = useRef<ForceGraphMethods>();

    useEffect(() => {
        const bloomPass = new UnrealBloomPass(new Vector2(256, 256), 1, 1, 0.1);
        const fg = fgRef.current;
        fg?.postProcessingComposer().addPass(bloomPass);
        return () => {
            fg?.postProcessingComposer().removePass(bloomPass);
        };
    }, []);

    const { graphData, setSelectAddress, graphAddress } = useGraph();

    const [graphAddressNode, setGraphAddressNode] = useState<any>(null);

    const focusOnNode = (node: any, distance: number) => {
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
        if (fgRef.current) {
            fgRef.current.cameraPosition(
                {
                    x: node.x * distRatio,
                    y: node.y * distRatio,
                    z: node.z * distRatio,
                },
                node,
                3000
            );
        }
    };

    // set up click event when we click node, set the address shown in user panel as selectAddress
    const handleClick = useCallback(
        (node) => {
            focusOnNode(node, 90);
            setSelectAddress(node.id);
        },
        [fgRef, setSelectAddress]
    );

    // set the without avatar address to random color
    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    const localImgs = [
        "/red.jpg",
        "/blue.png",
        "/brown.png",
        "/green.png",
        "/grey.png",
    ];

    return (
        <>
            <ForceGraph3D
                ref={fgRef}
                graphData={graphData}
                nodeLabel="id"
                nodeAutoColorBy="group"
                onNodeClick={handleClick}
                linkColor="#458888"
                linkWidth={0.5}
                backgroundColor="#000000"
                nodeThreeObject={(node: any) => {
                    if (node.id === graphAddress) {
                        setGraphAddressNode(node);
                        return new SpriteText("YOU");
                    }

                    const imgTexture = new THREE.TextureLoader().load(
                        node.img || localImgs[getRandomInt(localImgs.length)]
                        // Randomly give one
                    );

                    const geometry = new THREE.SphereGeometry(2, 6, 6);

                    const material = new THREE.MeshBasicMaterial({
                        map: imgTexture,
                    });
                    const mesh = new THREE.Mesh(geometry, material);
                    return mesh;
                }}
            />
            <LoadingButton
                className={styles.goToYouButton}
                onClick={() => focusOnNode(graphAddressNode, 500)}
            >
                Find your node
            </LoadingButton>
        </>
    );
};

export default FocusGraph;
