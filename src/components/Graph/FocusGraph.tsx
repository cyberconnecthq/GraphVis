// import dynamic from "next/dynamic";
import React, { useCallback, useRef } from "react";
import * as THREE from "three";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import data from "./data";

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
        },
        [fgRef]
    );

    const imgs = [
        "https://lh3.googleusercontent.com/YKy1kwiN1kwxxSoa5SHa1dAChc9cY8LMTMmR4SsEzodbEoHbC0ALA5eSlbRAauM8VyhdBtdHRJxIEbnbPfIneaD0yGG0yuSRBNIVnw=s128",
        "https://lh3.googleusercontent.com/kAUIhOwrsGefbciykjtRWwOVi3DJuoLgsjYfXxX5XwzbVQuXWlhxlSTu8OF2feNM-HO1PG9pzoWPwH-IA6xqqcdJKOwShGBJblYqkw=w600",
    ];

    return (
        <ForceGraph3D
            ref={fgRef}
            graphData={data}
            nodeLabel="id"
            nodeAutoColorBy="group"
            onNodeClick={handleClick}
            linkColor="#458888"
            linkWidth={0.5}
            nodeThreeObject={({ img }) => {
                console.log(img);
                const imgTexture = new THREE.TextureLoader().load(imgs[0]);
                const geometry = new THREE.SphereGeometry(2, 4, 4);

                // Solution 1 - Ball
                const material = new THREE.MeshBasicMaterial({
                    map: imgTexture,
                    overdraw: 0.1,
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
