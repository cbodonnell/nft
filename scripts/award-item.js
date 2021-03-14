const GameItem = artifacts.require('GameItem');

// TODO: Can this be imported somehow from utils??
const random = (length = 8) => {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
};

module.exports = async function(callback) {
    let gameItem = await GameItem.deployed();
    const account = "0xcaeB934174B93991a537345f31b76911d56763D2";
    const item = `https://studio10b.nyc/tokens/${random(32)}.json`;
    await gameItem.awardItem(account, item);
    console.log(`Awarded item: ${item}`);
    callback();
};