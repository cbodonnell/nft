const DonoToken = artifacts.require("DonoToken");

contract('DonoToken', (accounts) => {
  it('should award item', async () => {
    const donoTokenInstance = await DonoToken.deployed();
    const account = accounts[0];
    await donoTokenInstance.awardItem(account, "https://game.example/unique-token.json")
    const owner = await donoTokenInstance.ownerOf(1);
    assert.equal(owner, account, "Item was not awarded!");
  });
});