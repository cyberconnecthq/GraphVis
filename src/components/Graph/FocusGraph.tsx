// import dynamic from "next/dynamic";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import data from "./data";
import { useGraph } from "@/context/GraphContext";

// const _ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
// ssr: false
// });
/*
const ForwardGraph3D = forwardRef(
  (props: ForceGraphProps, ref: MutableRefObject<ForceGraphMethods>) => (
    <ForceGraph3D {...props} ref={ref} />
  )
);
*/
const FocusGraph = () => {
    const fgRef = useRef<ForceGraphMethods>();

    const { graphData, setSelectAddress } = useGraph();

    const handleClick = useCallback(
        (node) => {
            const distance = 90;
            const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
            if (fgRef.current) {
                console.log(fgRef.current);
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
            console.log("NODE!!!");
            console.log(node);
            setSelectAddress(node.id);
        },
        [fgRef]
    );

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    return (
        <ForceGraph3D
            ref={fgRef}
            graphData={graphData}
            nodeLabel="id"
            nodeAutoColorBy="group"
            onNodeClick={handleClick}
            linkColor="#458888"
            linkWidth={0.5}
            nodeThreeObject={(node: any) => {
                // const imgUrl = node.img || 'https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094961-stock-illustration-businesswoman-profile-icon.jpg'
                if (node.img) {
                    const imgTexture = new THREE.TextureLoader().load(
                        node.img
                        // Randomly give one
                        // ||imgs[getRandomInt(imgs.length)]
                    );
                } else {
                    const imgTexture = new THREE.TextureLoader().load(
                        "https://m.media-amazon.com/images/I/31fKBXVsahL._AC_.jpg"
                        // Randomly give one
                        // ||imgs[getRandomInt(imgs.length)]
                    );
                }
                const geometry = new THREE.SphereGeometry(2, 6, 6);

                // Solution 1 - Ball
                const material = new THREE.MeshBasicMaterial({
                    map: imgTexture,
                });
                const mesh = new THREE.Mesh(geometry, material);
                return mesh;

                // Solution 2 - 2D Box
                // const material = new THREE.SpriteMaterial({ map: imgTexture });
                // const sprite = new THREE.Sprite(material);
                // return sprite;
            }}
        />
    );
};

export default FocusGraph;
