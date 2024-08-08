import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { 
    clusterApiUrl, 
    Connection, 
    LAMPORTS_PER_SOL, 
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction, 

} from "@solana/web3.js"; 
import { createMemoInstruction } from "@solana/spl-memo";

const secretKey = process.env.SECRET_KEY;

const sender = getKeypairFromEnvironment("SECRET_KEY");

console.log(sender.publicKey.toBase58());

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const receiver = new PublicKey("E8csDTokKM6XvutFx48JnFh2a28DZJSJy8fqx838YpS");

const balance = await connection.getBalance(receiver);

console.log(`Andrei balance ${balance / LAMPORTS_PER_SOL} SOL`)

const transaction = new Transaction();

const transferInstruction = SystemProgram. transfer({
    fromPubkey: sender.publicKey,
    toPubkey: receiver,
    lamports: 0.1 * LAMPORTS_PER_SOL,
    });

    transaction. add(transferInstruction);

const memo = "Multumesc pentru Bere!";

const memoInstruction = createMemoInstruction(memo);
transaction.add(memoInstruction);

const signature = await sendAndConfirmTransaction (connection, transaction, [
   sender,
]);
  
console. log(`✅ Transaction confirmed. Signature: ${signature}`);




