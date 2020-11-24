import scrypt from "scrypt-js";
import { Buffer } from "buffer";

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

export { hashPassword };
