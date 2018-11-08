const Phoenix = artifacts.require("./Phoenix.sol");

contract("Phoenix", function(accounts) {
  let phoenixInstance;

  beforeEach(async function() {
    phoenixInstance = await Phoenix.deployed();
  });

  it("insures user", async () => {
    let insured = await phoenixInstance.isInsured(accounts[0]);
    assert.isFalse(insured, "User should not be insured");

    let tx = await phoenixInstance.makeInsurance({ value: 1e18 });
    insured = await phoenixInstance.isInsured(accounts[0]);
    assert.isTrue(insured, "User should now be insured");
  });
});
