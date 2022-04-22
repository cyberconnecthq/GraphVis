// src\components\Graph\FocusGraph.tsx

// import dynamic from "next/dynamic";
import { useGraph } from "@/context/GraphContext";
import React, { useCallback, useRef } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";
import * as THREE from "three";

const FocusGraph = () => {
  const fgRef = useRef<ForceGraphMethods>();

  const { graphData, setSelectAddress } = useGraph();

  // set up click event when we click node, set the address shown in user panel as selectAddress
  const handleClick = useCallback(
    (node) => {
      const distance = 90;
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
      setSelectAddress(node.id);
    },
    [fgRef, setSelectAddress]
  );

  // set the without avatar address to random color
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  const getNodeThreeObject = useCallback((node: any) => {
    const localImgs = [
      "/red.jpg",
      "/blue.png",
      "/brown.png",
      "/green.png",
      "/grey.png",
    ];

    const imgTexture = new THREE.TextureLoader().load(
      node.img || localImgs[getRandomInt(localImgs.length)]
      // Randomly give one
    );

    const geometry = new THREE.SphereGeometry(2, 6, 6);

    const material = new THREE.MeshBasicMaterial({
      map: imgTexture,
    });

    return new THREE.Mesh(geometry, material);
  }, []);

  return (
    <ForceGraph3D
      ref={fgRef}
      graphData={graphData}
      nodeLabel="id"
      nodeAutoColorBy="group"
      onNodeClick={handleClick}
      linkColor="#458888"
      linkWidth={0.5}
      backgroundColor="#000000"
      nodeThreeObject={getNodeThreeObject}
    />
  );
};

export default FocusGraph;
