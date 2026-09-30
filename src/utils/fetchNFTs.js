// Go to www.alchemy.com and create an account to grab your own api key!
const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY || "alch_SRgnKQqvHD0wOwsipNrPI";
const endpoint = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;

const PLACEHOLDER = "https://via.placeholder.com/500";

const normalize = (nft) => {
  const image =
    nft?.media?.[0]?.gateway ||
    nft?.image?.gateway ||
    nft?.image?.url ||
    (typeof nft?.image === "string" ? nft.image : PLACEHOLDER);

  const tokenId = nft?.tokenId ?? nft?.raw?.tokenId ?? "";

  return {
    image,
    id: String(tokenId),
    title: nft?.name || nft?.metadata?.name || "No Title",
    address: nft?.contract?.address || "",
    description:
      nft?.description || nft?.metadata?.description || "No Description",
    attributes: nft?.attributes || nft?.metadata?.attributes || [],
  };
};

export const fetchNFTs = async (
  owner,
  contractAddress,
  setNFTs,
  retryAttempt = 0
) => {
  if (!owner) return;

  if (retryAttempt > 4) {
    setNFTs([]);
    return;
  }

  try {
    const url = contractAddress
      ? `${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`
      : `${endpoint}/getNFTs?owner=${owner}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data?.error || !data?.ownedNfts) {
      if (retryAttempt < 4) {
        return fetchNFTs(owner, contractAddress, setNFTs, retryAttempt + 1);
      }
      setNFTs([]);
      return data;
    }

    const nfts = data.ownedNfts.map(normalize);
    setNFTs(nfts);
    return data;
  } catch (e) {
    if (retryAttempt < 4) {
      return fetchNFTs(owner, contractAddress, setNFTs, retryAttempt + 1);
    }
    setNFTs([]);
  }
};