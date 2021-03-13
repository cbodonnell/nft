const GameItem = artifacts.require('GameItem');

module.exports = async function(callback) {
    let gameItem = await GameItem.deployed();
    const account = "0xcaeB934174B93991a537345f31b76911d56763D2";
    await gameItem.awardItem(account, "https://game.example/unique-token.json");
    console.log('Awarded item!');
    callback();
};