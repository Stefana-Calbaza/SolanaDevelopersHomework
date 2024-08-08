import "dotenv/config";
import { 
    getExplorerLink, 
    getKeypairFromEnvironment 
} from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token"; 
import { Connection } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const user = getKeypairFromEnvironment('SECRET_KEY');

console.log(
    `🔑 Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);

const tokenMint = await createMint(connection, user, user.publicKey, null, 9);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`✅ Token Mint: ${link}`);
