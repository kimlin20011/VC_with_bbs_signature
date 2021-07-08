
import {
  generateBls12381G2KeyPair,
  blsSign,
  blsVerify,
  blsCreateProof,
  blsVerifyProof,
} from "@mattrglobal/node-bbs-signatures";

const main = async (): Promise<void> => {
  //Generate a new key pair
  const keyPair = await generateBls12381G2KeyPair();

  console.log("Key pair generated");
  console.log(`Public key base64 = ${Buffer.from(keyPair.publicKey).toString("base64")}`);

  //Set of messages we wish to sign
  const messages = [
    Uint8Array.from(Buffer.from("message1", "utf-8")),
    Uint8Array.from(Buffer.from("message2", "utf-8")),
  ];

  console.log("Signing a message set of " + messages);

  //Create the signature
  const signature = await blsSign({
    keyPair,
    messages: messages,
  });

  console.log(`Output signature base64 = ${Buffer.from(signature).toString("base64")}`);

  //Verify the signature
  const isVerified = await blsVerify({
    publicKey: keyPair.publicKey,
    messages: messages,
    signature,
  });

  const isVerifiedString = JSON.stringify(isVerified);
  console.log(`Signature verified ? ${isVerifiedString}`);

  //Derive a proof from the signature revealing the first message
  const proof = await blsCreateProof({
    signature,
    publicKey: keyPair.publicKey,
    messages,
    nonce: Uint8Array.from(Buffer.from("nonce", "utf-8")),
    revealed: [0],
  });

  console.log(`Output proof base64 = ${Buffer.from(proof).toString("base64")}`);

  //Verify the created proof
  const isProofVerified = await blsVerifyProof({
    proof,
    publicKey: keyPair.publicKey,
    messages: messages.slice(0, 1),
    nonce: Uint8Array.from(Buffer.from("nonce", "utf-8")),
  });

  const isProofVerifiedString = JSON.stringify(isProofVerified);
  console.log(`Proof verified ? ${isProofVerifiedString}`);
};

main();
