async function main() {
    //const Contract = await ethers.getContractFactory("EventFactory");
    const Contract = await ethers.getContractFactory("Event");
    
    // Start deployment, returning a promise that resolves to a contract object
    const contract = await Contract.deploy();
    console.log("Contract deployed to address:", contract.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });

// npx hardhat run scripts/deploy.js --network mumbai
// npx hardhat verify --network mumbai DEPLOYED_CONTRACT_ADDRESS