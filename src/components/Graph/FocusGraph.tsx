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

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    const imgs = [
        "https://lh3.googleusercontent.com/KDPpzuSj9MUgxhYuTBEE6PCUE_Ow4G5d3BNum8agWtzDhl1od94lTYdBJEMUpig0qnblcbmM2ecODkfztq2YPWsSYfFiyKH5K1ttVuY=s250",
        "https://lh3.googleusercontent.com/gCMXUGlZ_lw-DdYc1Y8m-cT68MRbVoVZYMuIlnqh3zV59PXOuq_NnCq4Qc2dkKqGMRYhoLcmzJlmZpfQIfEA1jRuXe8dueNHRASYfQ=s250",
        "https://lh3.googleusercontent.com/YKy1kwiN1kwxxSoa5SHa1dAChc9cY8LMTMmR4SsEzodbEoHbC0ALA5eSlbRAauM8VyhdBtdHRJxIEbnbPfIneaD0yGG0yuSRBNIVnw=s128",
        "https://lh3.googleusercontent.com/kAUIhOwrsGefbciykjtRWwOVi3DJuoLgsjYfXxX5XwzbVQuXWlhxlSTu8OF2feNM-HO1PG9pzoWPwH-IA6xqqcdJKOwShGBJblYqkw=w600",
        "https://lh3.googleusercontent.com/grHDJSaUSH115KoRrevQIptDRWkbgvCBGhHeXSfik8p2a2YWCnYZRcoNqBErxvAXx37B8WjFvIbsEDYP8m0SFa5VyHtAHFZPdWtnrw=s128",
        "https://lh3.googleusercontent.com/R7iNrAYD7iNs1U7uo0mgZ_WPeGpZE2NFv6B7Byjw6lWDogpqRf7TGqsXUbKuujbuXdAeM6C6JAsWItUX6k9smfIZtFWnmFkH7v7j2u0=s128",
        "https://anudit.dev/me.png",
        "https://lh3.googleusercontent.com/IWNUt93gg5kwF3VodiYiy1IoVvjI87gqKaf0BYiqzlVRTzUf8WJksJxsYoeEH4aguzv_o8JjphvDXL1DdnUKqXsbk4y6Whoy9PITag=s128",
        "https://lh3.googleusercontent.com/TpOqMje_vo4v688Ff8T2LVK4-J8vD06g8PENyHtx04RoA01gUMRJPdkqBXelgH8K2hPMoCBrZaORFtDBNuLawPVV0L_TU4Px4I32hw=w359",
        "https://lh3.googleusercontent.com/MgnHOIOyPhyWkVmFrFXJ3Sb88gvHH-K4CWadkEIQdDNF7K_93-gwiloxcKWSQJ0HuYtW2qSu79als_PRiDr4noq5rnIRoSqcoA4weww=s128",
        "https://lh3.googleusercontent.com/GSQxz8zAPM93ECC9DKknywfFp0JALYzSsixun1eaKDn56_Or1omalzZ9KgzmWi0uZBCSd5XJ7jMnOxsUCR7ZpHPgzjelSiB-TayaA8E=s128",
        "https://lh3.googleusercontent.com/9mGrAiuaK3qp0E2PHPt0BDARna7iA6svbQEYzMNM6YnuQkYeVJn_tdlMzIYT7QKTDRihgraYgQ_BFRZUPhIjUPnavEXj8ThqYnVu7vQ=s128",
        "https://lh3.googleusercontent.com/bHlXuQQWjvrD8SLOpf6dujm7lN5w6Hukx_to6yl88y4KL2W1FqcU1S1_oNBPWfcwNVGOqhD3zqEBJPQRJp6__oFlfLAxBZoQaknf=s128",
        "https://lh3.googleusercontent.com/ZIKDovUfNyNFYH02_TSJr5WTW6eJj0-aozhJAIWYWU24G16FIyEIplWBjEh1WIHQseMd_yZg1gpIUcgzIR7Y7XMreP0zoO1oQKQgeQ=s128",
        "https://lh3.googleusercontent.com/OO2GQ3qeJmlKm7A3T5lWhnNnxGHAYvXbRtdFp1NkOJnjll2uLg5LeXP_wZln3hYuCaphrcXWcmy-p8WHvFujv7GEYPkay0MopfihKHE=s128",
        "https://lh3.googleusercontent.com/qsxnWQWDdIUW67jNYMSmVIbDQri367mRucU7dELJTG0hGBgy11UoaSYLAixy7vnuUqJhg7yhgW5fybts2gmcJd5dQcA7MYgXjRF0Qw=s128",
        "https://lh3.googleusercontent.com/7ZFeNaod0-q0SuuAbg2I8ZXVNyU2XahVjpLzCXX7D_fNVUFYIKSjWdBHRaLOXUlF4zzM-mS62jQFaCzw1GhwF8jGFwTYV6dm7_1NxoA=s128",
        "https://lh3.googleusercontent.com/9mGrAiuaK3qp0E2PHPt0BDARna7iA6svbQEYzMNM6YnuQkYeVJn_tdlMzIYT7QKTDRihgraYgQ_BFRZUPhIjUPnavEXj8ThqYnVu7vQ=s128",
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
                const imgTexture = new THREE.TextureLoader().load(
                    imgs[getRandomInt(imgs.length)]
                );
                const geometry = new THREE.SphereGeometry(2, 6, 6);

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
