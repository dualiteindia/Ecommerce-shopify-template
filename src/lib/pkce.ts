// Helper function to generate a random string for the code verifier
function generateRandomString(length: number): string {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Helper function to compute SHA-256 hash
async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

// Helper function to convert buffer to string
function convertBufferToString(hash: ArrayBuffer): string {
  const uintArray = new Uint8Array(hash);
  const numberArray = Array.from(uintArray);
  return String.fromCharCode(...numberArray);
}

// Helper function to Base64URL encode a string
function base64UrlEncode(str: string): string {
  const base64 = btoa(str);
  // This is to ensure that the encoding does not have +, /, or = characters in it.
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

// Exported function to generate a code verifier
export function generateCodeVerifier(): string {
  return generateRandomString(128);
}

// Exported function to generate a code challenge from a verifier
export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const hashed = await sha256(codeVerifier);
  const hashString = convertBufferToString(hashed);
  return base64UrlEncode(hashString);
}

// Generate a random string for state
export function generateState(): string {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substring(2);
  return timestamp + randomString;
}

// Generate a random string for nonce
export function generateNonce(): string {
  const random = new Uint32Array(1);
  window.crypto.getRandomValues(random);
  return random[0].toString();
}

// Decode a JWT token to get its payload
export function decodeJwt(token: string): { header: any; payload: any; signature: string } {
  try {
    const [header, payload, signature] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    const decodedHeader = JSON.parse(atob(header.replace(/-/g, '+').replace(/_/g, '/')));
    return {
      header: decodedHeader,
      payload: decodedPayload,
      signature,
    };
  } catch (e) {
    console.error("Failed to decode JWT", e);
    return { header: {}, payload: {}, signature: '' };
  }
}
