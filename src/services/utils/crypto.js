import CryptoJS from "crypto-js";

const SECRET_KEY = "my_secret_key";

export const encryptMessage = (message) => {
  return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
};

export const decryptMessage = (encrypted) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);

  return bytes.toString(CryptoJS.enc.Utf8);
};
