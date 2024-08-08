import {
    getExplorerLink, 
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js"; 
import "dotenv/config";

const connection = new Connection ("https://api.devnet.solana.com", "confirmed");
const user = getKeypairFromEnvironment ("SECRET_KEY");

console.log(
    `🔑Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
);    

// Subtitute in a recipient from addresses.ts
const RECIPIENT_ADDRESS = "AjSSsjFAWhxWHgJRQom65Rnf55YoKRZmVixGVk5F44Ee";
const TOKEN_MINT_ADDRESS = "9GHWGmmrUQ6f9U1GspqsUUqL7d54Tp5VncFAoRVkngLS";
const recipient = new PublicKey (RECIPIENT_ADDRESS);
const tokenMintAccount = new PublicKey (TOKEN_MINT_ADDRESS);

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, 
    user, 
    tokenMintAccount, 
    recipient, 
);

const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet",
);

console. log (`✅ Created token Account: ${link}`);