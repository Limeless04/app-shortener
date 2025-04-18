import CryptoJs from 'crypto-js';

const secret: string = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET!;

export function encrypt(text: string): string {
  if (!secret) throw new Error('Encryption secret is not defined');
  const ciphertext = CryptoJs.AES.encrypt(text, secret).toString();
  return ciphertext; 
}

export function decrypt(cipherText: string): string {
    const bytes = CryptoJs.AES.decrypt(cipherText, secret);
    return bytes.toString(CryptoJs.enc.Utf8);
}