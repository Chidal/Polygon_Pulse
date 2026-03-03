const hre = require("hardhat");

async function main() {
  const contractAddress = "0xd9aC52cCaD325f96398A06ADad409B30b3768d24";

  console.log("Verifying contract on PolygonScan...");

  await hre.run("verify:verify", {
    address: contractAddress,
  });

  console.log("Verification submitted! Check: https://polygonscan.com/address/" + contractAddress + "#code");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });