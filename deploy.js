const ether = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();
async function main() {
  //  http://127.0.0.1:7545
  const provider = new ether.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ether.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync("./FundMe_sol_FundMe.abi", "utf-8");
  const bin = fs.readFileSync("./FundMe_sol_FundMe.bin", "utf-8");
  const contactFactory = new ether.ContractFactory(abi, bin, wallet);
  console.log("Deploying please wait....");
  const contract = await contactFactory.deploy();
  //   console.log(contrat);

  const Num = await contract.retrive();
  console.log(Num.toString());
  const store = await contract.store("7");
  const wait = await store.wait();
  const newNum = await contract.retrive();
  console.log(newNum.toString());
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
