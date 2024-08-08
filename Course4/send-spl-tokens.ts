import {
    getExplorerLink, 
    getKeypairFromEnvironment,
 } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js"; import "dotenv/config";
import "dotenv/config";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const user = getKeypairFromEnvironment ("SECRET_KEY");

console. log(
    `🔑Loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
); 

// Subtitute in a recipient from addresses.ts
const RECIPIENT_ADDRESS = "7ex95SBsiEP11awST86WoEpfjy9CTANberhkJKM8nuMb";
const TOKEN_MINT_ADDRESS = "9GHWGmmrUQ6f9U1GspqsUUqL7d54Tp5VncFAoRVkngLS";
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 9);

const recipient = new PublicKey (RECIPIENT_ADDRESS);
const tokenMintAccount = new PublicKey(TOKEN_MINT_ADDRESS);

const senderTokenAccount = await getOrCreateAssociatedTokenAccount (
    connection, 
    user, 
    tokenMintAccount, 
    user.publicKey,
);

console.log(`Attempting to send 1 token to ${recipient.toBase58()}...`)

const receiverTokenAccount = await getOrCreateAssociatedTokenAccount (
    connection, 
    user, 
    tokenMintAccount, 
    recipient,
);

const txSig = await transfer(
    connection,
    user,
    senderTokenAccount.address,
    receiverTokenAccount.address,
    user,
    10 * MINOR_UNITS_PER_MAJOR_UNITS,
  );

const link = getExplorerLink("transaction", txSig, "devnet");

console.log(`✅ Transaction confirmed, explorer link is: ${link}!`)