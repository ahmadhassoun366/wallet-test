import React, { useState } from "react";
import { ethers, toBeHex } from "ethers";
import BigNumber from "bignumber.js";

const CreateTransaction = () => {
  const [txnHex, setTxnHex] = useState(null);

  const createTxn = () => {
    const identifier = Uint8Array.from([1]);

    const nonce = new Uint8Array(4);
    const nonceValue = new BigNumber(56);
    new DataView(nonce.buffer).setUint32(0, nonceValue.toNumber(), false);

    // Amount - 8 bytes
    const amount = new Uint8Array(8);
    const amountValue = new BigNumber(10000000000);
    const upper = amountValue
      .dividedToIntegerBy(new BigNumber(2).pow(32))
      .toNumber();
    const lower = amountValue.mod(new BigNumber(2).pow(32)).toNumber();
    new DataView(amount.buffer).setUint32(0, upper, false);
    new DataView(amount.buffer).setUint32(4, lower, false);

    const recipient = ethers.randomBytes(20);
    console.log(recipient);
    const signature = ethers.randomBytes(65);
    console.log();
    const txn = new Uint8Array([
      ...identifier,
      ...nonce,
      ...amount,
      ...recipient,
      ...signature,
    ]);

    if (txn.length !== 98) {
      alert(`Transaction size is not 98 bytes. Found ${txn.length} bytes.`);
      return;
    }

    const txnHexString = toBeHex(txn);
    setTxnHex(txnHexString);

    console.log(txnHexString);
  };

  // const txn =
  //   "0x010000003800000002540be4005ab1b8bc55de0e93d9ade9ff3da1537e74247120b52315d498cebce0231b0470a589be68fe4cf39f32cfe19ab17faab6b80c1f95837ed3473818ee47f0ab354cfb554424618d63ad6b4b78afc511b9b5a3a770d460";

 

  //   const recipientBytes = txn.slice(13, 33);

  //   console.log('rex',recipientBytes);

  //   const signatureBytes = txn.slice(33, 98);

  //   console.log('sig',signatureBytes);
   
  return (
    <div>
      <h2>Create Transaction</h2>
      <button onClick={createTxn}>Generate Transaction</button>
      {txnHex && (
        <div>
          <p>Generated Transaction (Hex):</p>
          <textarea rows="4" cols="60" readOnly value={txnHex}></textarea>
        </div>
      )}
    </div>
  );
};

export default CreateTransaction;
