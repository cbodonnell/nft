const GameItem = artifacts.require("GameItem");

contract('GameItem', (accounts) => {
  it('should award item', async () => {
    const gameItemInstance = await GameItem.deployed();
    const account = accounts[0];
    await gameItemInstance.awardItem(account, "https://game.example/unique-token.json")
    const owner = await gameItemInstance.ownerOf(1);
    assert.equal(owner, account, "Item was not awarded!");
  });
});