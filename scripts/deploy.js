const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const Bank = await hre.ethers.getContractFactory("Bank");
  const BankContract = await Bank.deploy();
  await BankContract.deployed();
  console.log("BankContract deployed to:", BankContract.address);

  const Legacy = await hre.ethers.getContractFactory("Legacy");
  const LegacyContract = await Legacy.deploy();
  await LegacyContract.deployed();
  console.log("LegacyContract deployed to:", LegacyContract.address);

  const Insurance = await hre.ethers.getContractFactory("Insurance");
  const InsuranceContract = await Insurance.deploy();
  await InsuranceContract.deployed();
  console.log("InsuranceContract deployed to:", InsuranceContract.address);

  fs.writeFileSync('./config.js', `
  export const BankContract = "${BankContract.address}"
  export const LegacyContract = "${LegacyContract.address}"
  export const InsuranceContract = "${InsuranceContract.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
