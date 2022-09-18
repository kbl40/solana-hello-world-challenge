import { initializeKeypair } from "./initializeKeypair"
import * as web3 from "@solana/web3.js"

async function sagHallo(
   connection: web3.Connection,
   payer: web3.Keypair
): Promise<web3.TransactionSignature> {
  const transaction = new web3.Transaction()

  const instruction = new web3.TransactionInstruction(
    {
      keys: [],
      programId: new web3.PublicKey('CUnSKSqXShFhZQLTnt53ZzNps3CYqJX57XSEB9XN8tX3')
    }
  )

  transaction.add(instruction)

  const txSig = await web3.sendAndConfirmTransaction(
    connection, 
    transaction,
    [payer]
  )

  console.log(
    `Transaction: https://explorer.solana.com/tx/${txSig}?cluster=devnet`
  )
  
  return txSig
}

async function main() {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"))
  const user = await initializeKeypair(connection)

  console.log("PublicKey:", user.publicKey.toBase58())

  await sagHallo(
    connection,
    user
  )
}

main()
  .then(() => {
    console.log("Finished successfully")
    process.exit(0)
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
