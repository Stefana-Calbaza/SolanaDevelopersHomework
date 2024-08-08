import "dotenv/config";
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey, 
    clusterApiUrl,
} from "@solana/web3.js";

import bs58 from "bs58"

import { getKeypairFromEnvironment } from "@solana-developers/helpers";
const keypair = getKeypairFromEnvironment("SECRET_KEY")
const encodedKeypairKey = bs58.encode(keypair.secretKey) ;

const connection = new Connection(clusterApiUrl("devnet"))

console. log ("Connected to devnet");

const andrewolf = "E8fCsDToKKM6XvutFx48JnFh2a28D235Jy8fgx8J8YpS" ;
const publickey = new PublicKey(andrewolf) ;


console. log ('newKey: $(newKey]');
const balanceInLamport = await connection.getBalance(keypair.publicKey);
const balanceInSol = balanceInLamport / LAMPORTS_PER_SOL;

console.log(`Balance for wallet ${publickey} is ${balanceInSol} SOL`);
console.log(`Secret key value is ${encodedKeypairKey}`)