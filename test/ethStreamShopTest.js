const EthStreamShop = artifacts.require("EthStreamShop");

contract("EthStreamShop", async (accounts) => {
// Global variables
  const owner = accounts[0];
  const seller = accounts[1];
  const merchName = "Tv";
  const price = 10;
  const amount = 3;
  const timeLeft = 5;


  describe("Initial deployment", async () => {
    // Check that contract was deployed to blockchain
    it("Should asset true for deployment", async () => {
      await EthStreamShop.deployed();
      assert.isTrue(true);
    });

    // Check that the deployer of contract is owner
    it("Contract owner is the deployer", async () => {
      let instance = await EthStreamShop.deployed();
      // Calling getter function of owner state variable
      let result = await instance.owner();

      assert.equal(owner, result, "Is not owner of contract");
    })
  })

  describe("Function for addMerch", async () => {
    it("Add merchandise with provided information", async () => {
      let instance = await EthStreamShop.deployed();
      let tx = await instance.addMerch(seller, merchName, price, amount, timeLeft, { from: owner });

      // Get first merchandise in list
      let result = await instance.getMerch.call(0);
      // console.log(result);

      assert.notEqual(tx[0], seller, "seller's address is different from owner");
      assert.equal(result[0], merchName, "merchandise should not be empty");
      assert.isAtLeast(result[3].toNumber(), 1, "price should not be zero");
      assert.isAtLeast(result[2].toNumber(), 1, "amount should not be zero");
    });

    // Get merchandise
    it("Get merchandise with getMerch function", async () => {
      let instance = await EthStreamShop.deployed();
      let result = await instance.getMerch.call(0);

      assert(result);
    })
  })
})