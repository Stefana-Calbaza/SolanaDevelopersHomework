import { Connection, clusterApiUrl } from "@solana/web3.js";
import {
    Metaplex, 
    keypairIdentity,
    toMetaplexFile,
    irysStorage,
    PublicKey,
    NftWithToken,
} from "@metaplex-foundation/js";

import * as fs from 'fs';

import "dotenv/config";
import {
    getExplorerLink, 
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";

interface NftData {
    name: string;
    symbol: string;
    description: string;
    sellerFeeBasisPoints: number;
    imageFile: string;
}

// example data for a new NFT
const nftData = {
    name: "Solana Developers Program NFT", 
    symbol: "SDP",
    description: "First Solana NFT for Developers in Romania", 
    sellerFeeBasisPoints: 0, 
    imageFile: "logo-comets.png",
};

// TODO BONUS example data for updating an existing NFT
const updateNftData = {
    name: "Update", 
    symbol: "UPDATE", 
    description: "Update Description", 
    sellerfeeBasisPoints: 100, 
    imageFile: "success.png"
};

// helper function to upload image and metadata
async function uploadMetadata(
    metaplex: Metaplex,
    nftData: NftData,
): Promise<string> {
    console.log(" Uploading metadata...");

    // file to buffer
    const buffer = fs.readFileSync("src/" + nftData.imageFile);
    
    // buffer to metaplex file
    const file = toMetaplexFile(buffer, nftData.imageFile);
    
    // upload image and get image uri
    const imageUri = await metaplex.storage().upload(file);
    console.log("image uri:", imageUri);
    
    // upload metadata and get metadata uri (off chain metadata)
    const { uri } = await metaplex.nfts().uploadMetadata({
    name: nftData.name,
    symbol: nftData.symbol,
    description: nftData.description,
    image: imageUri,
});
    console.log("metadata uri:", uri);
    return uri;
 }

async function main() {
    // create a new connection to the cluster's API
    const connection = new Connection(clusterApiUrl("devnet"));
    
    // initialize a keypair for the user
    const user = getKeypairFromEnvironment("PRIVATE_KEY");

    console.log(
    ` We've loaded our keypair securely, using an env file! Our public key is:
${user.publicKey.toBase58()}`
    );
    
    // metaplex set up
    const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(user))
        .use(
            irysStorage({
                address: "https://devnet.bundlr.network",
                providerUrl: "https://api.devnet.solana.com",
                timeout: 60000,
            })
        );
    
    // upload the NFT data and get the URI for the metadata
    const uri = await uploadMetadata(metaplex, nftData)

    // create an NFT using the helper function and the URI from the metadata
    const nft = await createNft(metaplex, uri, nftData)
    }

 // helper function create NFT
async function createNft(
    metaplex: Metaplex,
    uri: string,
    nftData: NftData,
): Promise<NftWithToken> {
    console.log(" Creating NFT...");

    const { nft } = await metaplex.nfts().create(
    {
        uri: uri, // metadata URI
        name: nftData.name,
        sellerFeeBasisPoints: nftData.sellerFeeBasisPoints,
        symbol: nftData.symbol,
    },
    { commitment: "confirmed" },
);
    const link = getExplorerLink("address", nft.address.toString(), "devnet");
    console.log(`Token Mint: ${link}`);
    
    return nft as NftWithToken; 
}