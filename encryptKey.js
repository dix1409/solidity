const ether = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();
async function main() {
  const wallet = new ether.Wallet(process.env.PRIVATE_KEY);
  const encryptedJSONkey = await wallet.encrypt(
    process.env.PASSWORD,
    process.env.PRIVATE_KEY
  );
  fs.writeFileSync("./.encryptedKey.json", encryptedJSONkey);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
