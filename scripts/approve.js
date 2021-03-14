const GameItem = artifacts.require('GameItem');

module.exports = async function(callback) {
    let gameItem = await GameItem.deployed();
    const from = "0xcaeB934174B93991a537345f31b76911d56763D2";
    await gameItem.approve(gameItem.address, 1).catch(err => console.error(err));
    console.log(`Approved!`);
    callback();
};