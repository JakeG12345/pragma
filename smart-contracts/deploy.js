const main = async () => {
  const factory = await hre.ethers.getContractFactory("TheFeed")
  const contract = await factory.deploy()
  await contract.deployed()
  console.log("TheFeed deployed to:", contract.address)
}

;(async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
