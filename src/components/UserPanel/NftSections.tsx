import { useGraph } from "@/context/GraphContext";
import { CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import { NftListItem } from "../NftListItem";
import { NftModal } from "../NftModal";
import { PoapModal } from "../PoapModal";
import styles from "./index.module.css";

export const NftSections: React.FC = () => {
    const { selectAddress } = useGraph();
    const { account } = useMoralisWeb3Api();

    const [poaps, setPoaps] = useState<any>();
    const [nfts, setnfts] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [nftModalInfo, setNftModalInfo] = useState<any>(null);
    const [poapModalInfo, setPoapModalInfo] = useState<any>(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await account.getNFTs({ address: selectAddress });
            if (res.result) {
                const nfts = res.result.map((nft) => ({
                    ...nft,
                    metadata: nft.metadata ? JSON.parse(nft.metadata) : null,
                }));

                setnfts(nfts);
                setIsLoading(false);
            }
        })();
    }, [selectAddress, account]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await fetch(
                `https://api.poap.xyz/actions/scan/${selectAddress}`
            );
            let response;
            if (res.status === 200) {
                response = await res.json();
            }
            setPoaps(response);
            setIsLoading(false);
        })();
    }, [selectAddress]);

    const getName = (nft: any) => nft.metadata?.name || nft.name || null;

    const getImageUrl = (nft: any) => {
        let imgUrl = nft.metadata?.image_url || nft.metadata?.image || null;
        // convert ipfs urls to use gateway
        if (imgUrl?.startsWith("ipfs://ipfs/")) {
            imgUrl = imgUrl.replace("ipfs://", "https://ipfs.io/");
        } else if (imgUrl?.startsWith("ipfs://")) {
            imgUrl = imgUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
        }
        return imgUrl;
    };

    const getOpenseaUrl = (nft: any) =>
        `https://opensea.io/assets/${nft.token_address}/${nft.token_id}`;

    const getDescription = (nft: any) => nft.metadata?.description || null;

    const handleClickNft = (nft: any) => {
        setNftModalInfo({
            name: getName(nft),
            imageUrl: getImageUrl(nft),
            openseaUrl: getOpenseaUrl(nft),
            tokenAddress: nft.token_address,
            description: getDescription(nft),
        });
    };

    const handleClickPoap = (poap: any) => {
        setPoapModalInfo({
            name: poap.event.name,
            imageUrl: poap.event.image_url,
            description: poap.event.description,
        });
    };

    return (
        <>
            <div className={styles.nftSection}>
                <Typography color={"#989898"} margin={1}>
                    POAPs
                </Typography>
                <div className={styles.nftList}>
                    {isLoading ? (
                        <CircularProgress />
                    ) : poaps?.length ? (
                        poaps.map((poap: any) => (
                            <NftListItem
                                key={poap.tokenId}
                                name={poap.event.name}
                                imageUrl={poap.event.image_url}
                                onClick={() => handleClickPoap(poap)}
                            />
                        ))
                    ) : (
                        <Typography className={styles.noNftsInSection}>
                            No POAPS :(
                        </Typography>
                    )}
                </div>
            </div>
            <div className={styles.nftSection}>
                <Typography color={"#989898"} margin={1}>
                    NFTs Gallery
                </Typography>
                <div className={styles.nftList}>
                    {isLoading ? (
                        <CircularProgress />
                    ) : nfts?.length ? (
                        nfts.map((nft: any) => (
                            <NftListItem
                                key={nft.id}
                                name={getName(nft)}
                                imageUrl={getImageUrl(nft)}
                                onClick={() => handleClickNft(nft)}
                            />
                        ))
                    ) : (
                        <Typography className={styles.noNftsInSection}>
                            No NFTs :(
                        </Typography>
                    )}
                </div>
            </div>
            {nftModalInfo && (
                <NftModal
                    onClose={() => setNftModalInfo(null)}
                    name={nftModalInfo.name}
                    description={nftModalInfo.description}
                    imageUrl={nftModalInfo.imageUrl}
                    openseaUrl={nftModalInfo.openseaUrl}
                />
            )}
            {poapModalInfo && (
                <PoapModal
                    onClose={() => setPoapModalInfo(null)}
                    name={poapModalInfo.name}
                    description={poapModalInfo.description}
                    imageUrl={poapModalInfo.imageUrl}
                />
            )}
        </>
    );
};
