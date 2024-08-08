import {
    getExplorerLink, 
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, mintTo} from "@solana/spl-token";
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
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 9);

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, 
    user, 
    tokenMintAccount, 
    user.publicKey, 
);

console.log(`✅ Created token Account: ${tokenAccount.address.toBase58()}`)

const mintTxSix = await mintTo(
    connection,
    user,
    tokenMintAccount,
    tokenAccount.address,
    user,
    100 * MINOR_UNITS_PER_MAJOR_UNITS,
);

const link = getExplorerLink("transaction", mintTxSix, "devnet");

console.log(`✅ Success! Mint Token Transaction: ${link}`);