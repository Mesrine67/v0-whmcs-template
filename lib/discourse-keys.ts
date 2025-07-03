import * as crypto from "crypto"

// Helper to remove PEM headers and decode base64 to DER Uint8Array
function pemToDer(pem: string): Uint8Array {
  const base64 = pem
    .replace(/-----BEGIN (RSA )?PRIVATE KEY-----/, "")
    .replace(/-----END (RSA )?PRIVATE KEY-----/, "")
    .replace(/\s/g, "") // Remove all whitespace, including newlines
  return Buffer.from(base64, "base64")
}

// Helper to convert Base64 string to Uint8Array
function base64ToUint8Array(base64: string): Uint8Array {
  return Buffer.from(base64, "base64")
}

export async function decryptDiscoursePayload(payloadBase64: string, privateKeyPem: string): Promise<any> {
  try {
    const privateKeyDer = pemToDer(privateKeyPem)

    const privateKey = await crypto.subtle.importKey(
      "pkcs8", // Format of the key (PKCS#8 for private keys)
      privateKeyDer,
      {
        name: "RSA-PKCS1-v1_5", // Algorithm for decryption (matches PHP's openssl_private_decrypt default padding)
      },
      true, // extractable
      ["decrypt"],
    )

    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: "RSA-PKCS1-v1_5", // Algorithm for decryption
      },
      privateKey,
      base64ToUint8Array(payloadBase64),
    )

    const decryptedData = new TextDecoder().decode(decryptedBuffer)
    return JSON.parse(decryptedData)
  } catch (error) {
    console.error("Error decrypting Discourse payload:", error)
    throw new Error(`Failed to decrypt Discourse payload: ${error instanceof Error ? error.message : String(error)}`)
  }
}
