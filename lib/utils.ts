const crypto = require('crypto');//-

 const secretKey = (process.env.SECRET_KEY || "")
   .padEnd(32, "0")
   .substring(0, 32);
 const algorithm = "aes-256-cbc";

 const encrypt = (text: string) => {
   const iv = crypto.randomBytes(16);
   const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
   console.log(secretKey);
   const encrypted = Buffer.concat([
     cipher.update(text, "utf8"),
     cipher.final(),
   ]);

   return {
     iv: iv.toString("hex"),
     content: encrypted.toString("hex"),
   };
 };

 const decrypt = (hash: { iv: string; content: string }) => {
   const decipher = crypto.createDecipheriv(
     algorithm,
     secretKey,
     Buffer.from(hash.iv, "hex")
   );
   const decrypted = Buffer.concat([
     decipher.update(Buffer.from(hash.content, "hex")),
     decipher.final(),
   ]);

   return decrypted.toString("utf8");
 };

 export { encrypt, decrypt };