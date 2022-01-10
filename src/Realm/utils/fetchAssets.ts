import { Dispatch, SetStateAction } from "react";

// const CONTRACT_ADDRESS = "0xc631164b6cb1340b5123c9162f8558c866de1926" // DA
// const CONTRACT_ADDRESS = "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb" // CryptoPunks
const CONTRACT_ADDRESS = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d" // BAYC

export default async function fetchAssets(tokenId: number, setAssetsFetched: Dispatch<SetStateAction<boolean>>) {
  
  const data = await fetch(`https://api.opensea.io/api/v1/asset/${CONTRACT_ADDRESS}/${tokenId}/`)
  if (!data.ok) console.error("Error fetching contract data");
  const contract = await data.json();

  // NFTPORT.XYZ API
  // const response = await fetch(`https://api.nftport.xyz/v0/accounts/${contract.owner.address}?chain=ethereum`, {
  //   "method": "GET",
  //   "headers": {
  //     "Content-Type": "application/json",
  //     "Authorization": `${process.env.NFT_PORT_API_KEY}`
  //   }
  // })
  // if (!response.ok) console.error("Error fetching contract data");
  // const assets = await response.json();
  // console.log(await assets)

  const response = await fetch(`https://api.opensea.io/api/v1/assets?owner=${contract.owner.address}&order_by=sale_price&order_direction=desc&limit=20`);
  if (!response.ok) console.error("Error fetching assets");
  const { assets } = await response.json()

  if (assets && assets.length>0) {
    for (let i=0; i<assets.length; i++) {
      const asset = assets[i];
      const collectionData = await fetch(`https://api.opensea.io/api/v1/collection/${asset.collection.slug}`)
      if (!collectionData.ok) console.error("collection not found");
      const { collection } = await collectionData.json();

      asset.totalSupply = collection.stats.total_supply;
    }
    setAssetsFetched(true);
  }
  return {
    owner: contract.owner,
    assets: assets
  };
}
