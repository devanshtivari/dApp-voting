async function main() {
  const Vote = await ethers.getContractFactory("Vote");

  const Voting = await Vote.deploy(["Mark" , "Sam" , "John" , "Bishop"],90);
  console.log("Voting address is: ", Voting.runner.address);
}

main()
.then(() => process.exit(0))
.catch(err => {
  console.log("Error occured",err);
  process.exit(1);
})