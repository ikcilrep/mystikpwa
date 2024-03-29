import scrypt from "scrypt-js";
import { Buffer } from "buffer";
import aesjs from "aes-js";

const hashPassword = (password, saltMaterial) => {
  const salt = Buffer.from(saltMaterial.normalize("NFKC"));
  const N = 16384,
    r = 8,
    p = 1;
  const dkLen = 32;
  return scrypt.scrypt(
    Buffer.from(password.normalize("NFKC")),
    salt,
    N,
    r,
    p,
    dkLen
  );
};

const verifyPassword = async (password, saltMaterial, hash) => {
  const hashedPassword = await hashPassword(password, saltMaterial);
  const decodedHash = Buffer.from(hash, "base64");

  if (hashedPassword.length !== decodedHash.length) {
    return false;
  }

  for (let i = 0; i < hashedPassword.length; i++) {
    if (hashedPassword[i] !== decodedHash[i]) {
      return false;
    }
  }
  return true;
};

const deriveKey = async (password, saltMaterial) => {
  return hashPassword(password, saltMaterial);
};

const encrypt = (data, key) => {
  const aesCtr = new aesjs.ModeOfOperation.ctr(key);
  const dataBytes = aesjs.utils.utf8.toBytes(data.normalize("NFKC"));
  const encryptedBytes = aesCtr.encrypt(dataBytes);
  return [...encryptedBytes];
};

const decrypt = (encryptedData, key) => {
  const aesCtr = new aesjs.ModeOfOperation.ctr(key);
  const decodedEncryptedData = Buffer.from(encryptedData, "base64");
  const dataBytes = aesCtr.decrypt(decodedEncryptedData);
  return aesjs.utils.utf8.fromBytes(dataBytes);
};

export { hashPassword, verifyPassword, deriveKey, encrypt, decrypt };
